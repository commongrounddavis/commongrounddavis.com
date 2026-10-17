/**
 * Interest form → Discord.
 *
 * Paste this file into the Google Form's Apps Script project.
 * Setup steps: README.md → "Interest Form + Discord notify".
 *
 * The webhook URL lives in Script Properties as DISCORD_WEBHOOK_URL.
 * Do not paste it into this file or commit it.
 *
 * Optional Script Property RESPONSE_SHEET_URL: a Google Sheet link shown
 * on every Discord post so leads can open the full responses.
 */

var DISCORD_WEBHOOK_PROP = "DISCORD_WEBHOOK_URL";
var RESPONSE_SHEET_PROP = "RESPONSE_SHEET_URL";
var EMBED_COLOR = 0x2a66c6;
var FIELD_VALUE_MAX = 1024;
var MAX_FIELDS = 25;

/** Installable trigger handler. Works on the Form or on the response Sheet. */
function onFormSubmit(e) {
  var webhook = webhookUrl_();
  if (!webhook) {
    console.error("Set Script Property " + DISCORD_WEBHOOK_PROP + " and run this again.");
    return;
  }

  var id = responseId_(e);
  if (id && alreadyPosted_(id)) return;

  var fields = fieldsFromEvent_(e);
  if (!fields.length) return;

  var sheet = responseSheetUrl_();
  if (sheet) {
    fields.unshift({
      name: "Full responses",
      value: sheet,
      inline: false,
    });
  }

  var shown = fields.slice(0, MAX_FIELDS);
  if (fields.length > MAX_FIELDS) {
    shown[MAX_FIELDS - 1] = {
      name: "Cut off",
      value: fields.length - (MAX_FIELDS - 1) + " more answers did not fit in one Discord message.",
      inline: false,
    };
  }

  var res = UrlFetchApp.fetch(webhook, {
    method: "post",
    contentType: "application/json",
    muteHttpExceptions: true,
    payload: JSON.stringify({
      embeds: [
        {
          title: "New interest form",
          url: "https://commongrounddavis.com/join",
          color: EMBED_COLOR,
          fields: shown,
          footer: { text: "commongrounddavis.com" },
          timestamp: timestamp_(e),
        },
      ],
    }),
  });

  var code = res.getResponseCode();
  if (code < 200 || code >= 300) {
    console.error("Discord rejected the post (" + code + "). " + res.getContentText().slice(0, 300));
    return;
  }
  if (id) markPosted_(id);
}

/** Run once from the script editor after the file is pasted into the Form or Sheet. */
function installTrigger() {
  var existing = ScriptApp.getProjectTriggers();
  for (var i = 0; i < existing.length; i++) {
    if (existing[i].getHandlerFunction() === "onFormSubmit") {
      ScriptApp.deleteTrigger(existing[i]);
    }
  }

  var form = activeForm_();
  if (form) {
    ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();
    return;
  }
  var sheet = activeSpreadsheet_();
  if (sheet) {
    ScriptApp.newTrigger("onFormSubmit").forSpreadsheet(sheet).onFormSubmit().create();
    return;
  }
  throw new Error("Open this project from the Google Form or its response Sheet, then run installTrigger again.");
}

/** Posts a fake response so you can confirm the webhook without filling out the form. */
function sendTest() {
  onFormSubmit({
    namedValues: {
      "Full name": ["Test Student"],
      "UC Davis email": ["test@ucdavis.edu"],
      "Why do you want to join Common Ground Davis?": ["Test ping from Apps Script. You can delete this Discord message."],
    },
  });
}

function fieldsFromEvent_(e) {
  var fields = [];
  if (e && e.response && e.response.getItemResponses) {
    var account = e.response.getRespondentEmail();
    if (account) pushField_(fields, "Account email", account);
    var items = e.response.getItemResponses();
    for (var i = 0; i < items.length; i++) {
      var item = items[i].getItem();
      pushField_(
        fields,
        item.getTitle(),
        formatAnswer_(item, items[i].getResponse()),
        item.getHelpText()
      );
    }
    return fields;
  }

  var named = (e && e.namedValues) || {};
  var questions = Object.keys(named);
  for (var q = 0; q < questions.length; q++) {
    if (questions[q] === "Timestamp") continue;
    pushField_(fields, questions[q], named[questions[q]]);
  }
  return fields;
}

function pushField_(fields, name, answer, help) {
  var text = asText_(answer);
  if (!text) return;
  var shown = text.replace(/\*/g, "");
  var note = help ? String(help).trim() : "";
  var quoted = "";
  if (note) {
    var lines = note.split(/\n/);
    var quotedLines = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      quotedLines.push("> " + line.replace(/\*/g, ""));
    }
    quoted = quotedLines.join("\n");
  }
  var body = "**" + shown + "**" + (quoted ? "\n" + quoted : "");
  var compact = !quoted && shown.length <= 80 && shown.indexOf("\n") === -1;
  var chunks = body.match(new RegExp("[\\s\\S]{1," + FIELD_VALUE_MAX + "}", "g")) || [body];
  for (var c = 0; c < chunks.length; c++) {
    var label = c === 0 ? String(name) : String(name) + " (cont.)";
    fields.push({
      name: label.slice(0, 256),
      value: chunks[c],
      inline: compact,
    });
  }
}

function formatAnswer_(item, answer) {
  var type = item.getType();
  if (type == FormApp.ItemType.GRID) {
    return pairRows_(item.asGridItem().getRows(), answer);
  }
  if (type == FormApp.ItemType.CHECKBOX_GRID) {
    return pairRows_(item.asCheckboxGridItem().getRows(), answer);
  }
  return asText_(answer);
}

function pairRows_(rows, answer) {
  var values = answer || [];
  var lines = [];
  for (var i = 0; i < rows.length; i++) {
    var picked = asText_(values[i]);
    if (picked) lines.push(rows[i] + ": " + picked);
  }
  return lines.join("\n");
}

function asText_(answer) {
  if (answer == null || answer === "") return "";
  if (Object.prototype.toString.call(answer) === "[object Array]") {
    return answer
      .filter(function (part) {
        return part != null && String(part).trim() !== "";
      })
      .join(", ")
      .trim();
  }
  return String(answer).trim();
}

function timestamp_(e) {
  if (e && e.response && e.response.getTimestamp) {
    return e.response.getTimestamp().toISOString();
  }
  return new Date().toISOString();
}

function responseId_(e) {
  if (e && e.response && e.response.getId) return e.response.getId();
  if (e && e.range && e.range.getSheet) {
    return e.range.getSheet().getParent().getId() + ":" + e.range.getRow();
  }
  return "";
}

function alreadyPosted_(id) {
  return CacheService.getScriptCache().get("cgd-form:" + id) === "1";
}

function markPosted_(id) {
  CacheService.getScriptCache().put("cgd-form:" + id, "1", 21600);
}

function webhookUrl_() {
  return PropertiesService.getScriptProperties().getProperty(DISCORD_WEBHOOK_PROP) || "";
}

function responseSheetUrl_() {
  var set = PropertiesService.getScriptProperties().getProperty(RESPONSE_SHEET_PROP);
  if (set) return String(set).trim();
  try {
    var form = FormApp.getActiveForm();
    if (form) {
      var id = form.getDestinationId();
      if (id) return "https://docs.google.com/spreadsheets/d/" + id;
    }
  } catch (err) {}
  try {
    var ss = SpreadsheetApp.getActive();
    if (ss) return ss.getUrl();
  } catch (err) {}
  return "";
}

function activeForm_() {
  try {
    return FormApp.getActiveForm();
  } catch (err) {
    return null;
  }
}

function activeSpreadsheet_() {
  try {
    return SpreadsheetApp.getActive();
  } catch (err) {
    return null;
  }
}

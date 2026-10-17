/** Google Forms + related club intake links. */

export type FormQuestion = {
  id: string;
  label: string;
  type: "short" | "long" | "email" | "single" | "multi" | "checkbox";
  required: boolean;
  options?: string[];
  helpText?: string;
};

export type ClubForm = {
  id: string;
  title: string;
  blurb: string;
  url: string;
  ucdavisOnly: true;
  questions: FormQuestion[];
};

export const AGGIELIFE_URL = "";

/** Display label for the members-only topic channel (until Discord is live). */
export const DISCORD_TOPIC_CHANNEL = "#topic-suggestions";

export const INTEREST_FORM_GOOGLE_TITLE =
  "Common Ground Davis — Interest Form";

export const INTEREST_FORM_GOOGLE_DESCRIPTION = `UC Davis students only (@ucdavis.edu).

Common Ground Davis is a political debate club for people who disagree and want to understand each other — not to recruit you into a party or crown a winner. Before anyone argues their side, they must steelman the other: state the strongest version of the opposing view and why a reasonable person might hold it.

We’re registering as a student org soon. This form is the founding-cohort / interest waitlist. Optional political-lean questions are only for pairing speakers later — never to exclude anyone.

Ongoing debate topic ideas (once you’re in): Discord, not this form.

Questions? https://commongrounddavis.com/contact`;

export const INTEREST_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdOMmiKpiUT57s6clm9SWq3CGLZLPOl-gtKgRylMfAafjvo-A/viewform";

export const INTEREST_FORM: ClubForm = {
  id: "interest",
  title: INTEREST_FORM_GOOGLE_TITLE,
  blurb: INTEREST_FORM_GOOGLE_DESCRIPTION,
  url: INTEREST_FORM_URL,
  ucdavisOnly: true,
  questions: [
    { id: "name", label: "Full name", type: "short", required: true },
    {
      id: "email",
      label: "UC Davis email",
      type: "email",
      required: true,
      helpText: "Use your @ucdavis.edu address.",
    },
    {
      id: "standing",
      label: "Year / standing",
      type: "single",
      required: true,
      options: [
        "1st year",
        "2nd year",
        "3rd year",
        "4th+ year",
        "Graduate",
        "Other",
      ],
    },
    {
      id: "why",
      label: "Why do you want to join Common Ground Davis?",
      type: "long",
      required: true,
      helpText: "A few sentences is enough.",
    },
    {
      id: "topics",
      label:
        "What political topics do you most want to debate or hear debated?",
      type: "long",
      required: true,
      helpText:
        "Examples welcome. (Once you’re a member, ongoing topic ideas go in Discord — not this form.)",
    },
    {
      id: "lean",
      label: "Optional: how would you describe your political lean?",
      type: "single",
      required: false,
      options: [
        "Left / progressive",
        "Center-left",
        "Centrist / mixed",
        "Center-right",
        "Right / conservative",
        "Independent / other",
        "Prefer not to say",
      ],
      helpText:
        "Used only to understand group mix and pair willing speakers — never to exclude anyone.",
    },
    {
      id: "founding",
      label:
        "Are you interested in the founding cohort (helping launch the club)?",
      type: "single",
      required: true,
      options: ["Yes", "Maybe / tell me more", "No — just keep me updated"],
    },
    {
      id: "hear",
      label: "How did you hear about us?",
      type: "short",
      required: false,
    },
    {
      id: "conduct",
      label:
        "I understand CGD requires steelmanning (fairly stating the other side before arguing) and criticizing ideas, not people.",
      type: "checkbox",
      required: true,
    },
  ],
};

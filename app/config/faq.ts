import { CLUB_STATUS } from "./meetings";

export type FaqItem = {
  q: string;
  a: string;
};

/** Shown under the interest form on /join. */
export const JOIN_FAQ: FaqItem[] = [
  {
    q: "Do I have to pick a side to join?",
    a: "No. The lean question on the form is optional, and it’s only used to pair willing speakers — never to exclude anyone.",
  },
  {
    q: "Do I have to debate?",
    a: "No. Most of the room is audience: you ask questions and answer the anonymous check at the end. Speak when you want to.",
  },
  {
    q: "Is the club official yet?",
    a: CLUB_STATUS,
  },
  {
    q: "Why UC Davis email only?",
    a: "The club is a UC Davis student org, so the form is restricted to @ucdavis.edu accounts. Sign into that Google account first.",
  },
];

/** Shown at the bottom of /debate-format. */
export const FORMAT_FAQ: FaqItem[] = [
  {
    q: "What's a steelman?",
    a: "It's the opposite of a strawman. Instead of making the other side's argument sound weak, you restate it in the strongest, fairest version you can. A good test is whether the person you're restating would say \"yes, that's what I meant.\"",
  },
  {
    q: "When do I steelman?",
    a: "After every point the other side makes, right before you respond. Openings are different, since there's nothing to restate yet.",
  },
  {
    q: "What's a logical fallacy?",
    a: "It's a mistake in reasoning that makes an argument look stronger than it really is. Common ones are strawmanning (arguing against a weaker version of what someone said), ad hominem (attacking the person instead of their point), and false dilemmas (acting like there are only two options). The moderator will point them out when they come up.",
  },
  {
    q: "Can I argue a side I don't hold?",
    a: "Not in a standard debate. Speakers argue positions they genuinely hold.",
  },
  {
    q: "What if I get my steelman wrong?",
    a: "It happens, and it's fine. You'll get corrected, you fix it, and then you carry on with your response.",
  },
  {
    q: "What's expected from the audience?",
    a: "Listen while people speak. No interrupting, heckling, booing, or cheering. When you ask a question, keep it short, keep it a question, and keep it about ideas, not people.",
  },
  {
    q: "What happens if someone breaks the rules?",
    a: "Usually just a reminder from the moderator. If it keeps happening, they sit out their next turn, and after that they're asked to leave the meeting. Being removed from the club is rare: two officers have to agree, and they hear the person out first.",
  },
  {
    q: "What gets someone removed right away?",
    a: "Threats, slurs, harassment, sharing someone's personal info, or recording or posting someone without asking.",
  },
  {
    q: "What if the two sides disagree on the facts?",
    a: "The moderator doesn't decide who's right. They note that it's disputed, and the debate moves on.",
  },
  {
    q: "What if things get heated?",
    a: "The moderator can pause the debate for a couple of minutes so everyone can cool down. If someone thinks the moderator is being unfair, another officer takes over.",
  },
  {
    q: "Is anything off limits?",
    a: "We debate ideas and policies. We never debate whether someone deserves to exist or be in the room.",
  },
  {
    q: "Who wins?",
    a: "Nobody. We're not scoring points. After each debate we ask the room whether they understand both sides better than they did before.",
  },
];

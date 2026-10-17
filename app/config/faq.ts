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
    q: "Who wins?",
    a: "Nobody. We're not scoring points. After each debate we ask the room whether they understand both sides better than they did before.",
  },
];

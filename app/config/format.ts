/**
 * Debate format — /debate-format and the home "What we do" rows.
 */

/** Home page — four things a meeting actually is. Icons: Flat Color Icons, Icons8 (MIT), and Noto Emoji (Apache-2.0) for the scale. */
export const WHAT_WE_DO = [
  {
    title: "The Steelman Argument",
    icon: "/icons/steelman.svg",
    body: `
    Before presenting a rebutall members must accurately present the strongest interpretation of the 
    opposing argument and explain why a reasonable person may hold that belief.
    `,
  },
  {
    title: "No winner",
    icon: "/icons/no-winner.svg",
    body: "We do not score or declare a winner. The goal of the debate is to understand both sides and yourself better, and to find common ground.",
  },
  {
    title: "Show up",
    icon: "/icons/show-up.svg",
    body: "Show up even when you are not speaking. You can learn from the room and see what both sides actually think. You will debate too, just not on every topic.",
  },
  {
    title: "Preparation",
    icon: "/icons/ahead.svg",
    body: "We send out the topic days before the debate, so both sides have time to prepare. A good debate is not a surprise.",
  },
] as const;

export const FORMAT_INTRO =
  "The idea is that you understand someone's argument well enough to state it fairly before you disagree with it.";

export const FORMAT_GLANCE = [
  "1-2 hours",
  "1+ debates per meeting",
  "5 rounds per debate",
] as const;

export const BEFORE_DEBATE = [
  "Post a topic idea in #topic-suggestions on Discord.",
  "At a meeting, we go through the ideas. Tell us if you're interested, which side you'd take, and whether you want to speak.",
  "A few days before the debate, we post the topic on Discord so you have time to read up on it.",
] as const;

export const MOTION =
  "The moderator reads the motion out loud and explains any terms, so everyone is arguing about the same thing.";

export const OPENING =
  "Each side explains its own position. Attacking the other side's position is not allowed.";

export const ROUND_TITLE = "Rounds (5 per debate)";

export const EXCHANGE = [
  "One side makes a point.",
  "The other side restates that point in its strongest form (this is called a steelman), then responds.",
] as const;

export const ROUND_SWAP = "Sides take turns going first.";

export const AUDIENCE_QUESTIONS =
  "The moderator can pause between rounds to take questions from the room.";

export const CLOSINGS =
  "Each speaker says what they learned from the other side and whether it changed their mind at all.";

export const MODERATOR =
  "The moderator runs the debate and keeps it fair. They read the motion, keep the rounds in order, and decide when to pause for audience questions. They also step in when someone uses a logical fallacy, like strawmanning or attacking the person instead of the point, or when someone breaks the conduct rules, like talking over a speaker or making things personal. When that happens, the moderator says what the problem was so everyone can see it.";

export const AUDIENCE = [
  "Write one line about the strongest point you heard from the side you don't agree with. The moderator may read a few out if there's time, but you don't have to say anything out loud.",
  "Answer a quick poll: do you understand both sides better than you did when the debate started?",
] as const;

export const FORMAT_NOTE =
  "This format isn't final. If something isn't working, tell us on Discord.";

/**
 * Verbatim from README.md "What is Common Ground Davis" — keep in sync.
 * Spelling only is corrected in both places.
 */

export const ABOUT_CONDENSED = [
  "Common Ground Davis brings together UC Davis students who disagree politically, into structured debates built around the Steelman argument - before presenting an argument members must accurately present the strongest interpretation of the opposing argument and explain why a reasonable person may hold that belief.",
  "We are founded & led by two co-leaders who disagree politically and practice what they preach.",
] as const;

export const ABOUT_PROBLEM = [
  'Political polarization is a growing problem in the United States and at UC Davis. At the extremes of the right wing, empathy and opposing views are dismissed as "woke," "Marxist," "communist," or "mentally ill." On the far left, disagreement is immediately labeled "fascist," "violent speech," "Nazism," or "anti-human rights." Both sides dismiss honest questions from the other with labels that justify ignoring opposing views and keep people from hearing each other out.',
  "Not to mention the growing misinformation crisis. Whether you're a Democrat or a Republican, ask yourself this: the reasons you dislike the other side, did you hear them directly from the other side, or are they what you think the other side believes? Most of what we know about the other side comes from our friends or our social media feeds. And even when we do hear it from them, it's usually one clip, one tweet, or the loudest person, not the full argument. So we end up hating the other side over beliefs most of them don't even hold.",
  'Take guns. The left hears, "They care more about their guns than people\'s lives." The right hears, "They want to take away your right to defend yourself." But most gun owners worry that criminals will always get guns illegally, so stricter laws would only take guns from the people trying to protect themselves. Many of them still support stronger background checks. And most people pushing for gun laws just want fewer kids to die at school. Both sides want the same thing: guns out of the wrong hands.',
  "Neither side is evil. We're both arguing against strawmen: beliefs that are either false or taken out of context. The fix is hearing the other side's full argument, and that's what we're here for.",
] as const;

export type ProblemExample = {
  topic: string;
  body: string;
};

export const PROBLEM_EXAMPLES: readonly ProblemExample[] = [
  {
    topic: "Policing",
    body: 'The right hears, "They want to get rid of the police." The left hears, "They don\'t care when cops get it wrong." But both sides want cops to do better. Most people who back the police know cops mess up sometimes. Their point is: would you rather have cops who get it wrong 1% of the time, or no cops at all and a lawless society? A few bad apples don\'t mean you throw out every apple, so fix them with better training instead. And most people pushing for reform don\'t want zero police either. They just want fewer innocent people hurt or jailed.',
  },
  {
    topic: "Healthcare",
    body: 'The right hears, "They just want free stuff paid for with your taxes." The left hears, "They don\'t care if poor people die." But most people pushing for universal healthcare just don\'t want anyone going broke because they got sick. And most people against it worry about higher taxes and the government running it badly. Both sides want people to get care they can afford.',
  },
];

export type MisinformationIllustration = {
  src: string;
  width: number;
  height: number;
};

/** Six-or-nine: Igor Vorobyov (1972). Goes with “What we believe.” */
export const ILLUSTRATION_SIX_NINE: MisinformationIllustration = {
  src: "/images/perspective-six-nine.png",
  width: 543,
  height: 325,
};

/** Media framing cartoon. Goes with “The Problem.” */
export const ILLUSTRATION_MEDIA: MisinformationIllustration = {
  src: "/images/media-framing.jpg",
  width: 798,
  height: 556,
};

/** Home About still shows both. */
export const ABOUT_ILLUSTRATIONS: readonly MisinformationIllustration[] = [
  ILLUSTRATION_MEDIA,
  ILLUSTRATION_SIX_NINE,
];

export const ABOUT_FULL = [
  "Common Ground Davis is a political debate club at UC Davis for students who disagree and want to understand each other.",
  ABOUT_PROBLEM.join("\n\n"),
  "We, at Common Ground Davis, want to change that status quo. We start from one belief: everyone has reasons behind their beliefs, and no one is inherently evil. People don't knowingly do something they believe is wrong without a reason. Either they believe it's the right thing to do, or they accept that it's wrong in isolation but justified in the broader context (e.g., breaking a rule to prevent a bigger harm). Everyone's reasons come from their own lived experiences, so the people we disagree with usually have genuine reasons for their beliefs, even if those reasons look flawed to us.",
  "Whether a reason is good is a separate question from whether it exists, and you can't judge it fairly until you understand it. That's why, in our meetings, before a member argues their own side or presents a rebuttal, they must accurately present the strongest version of the opposing argument and explain why a reasonable person might hold it. This is the steelman argument, the direct inverse of the strawman argument. Strawmanning is a tempting shortcut: attacking a weaker / inaccurate version of the other side makes it easy to win a debate, but the victory is illusory and only deepens polarization. At Common Ground Davis, we practice the harder alternative, because understanding is where real conversation begins.",
  "Our goal isn't to get everyone to agree. It's to build a space where members can disagree and still understand each other. Members leave with sharper arguments, a clearer way to say what they actually think, and less fear of political conversations with their peers. And we hold ourselves to the same standard: this club is founded and co-led by two students who disagree politically, who have civil conversations aimed at understanding each other's views, and who want to promote that culture across our campus.",
] as const;

export const FOUNDING_ESSAY_URL = "https://vijitdua.com/blog/WBTZE6mR";

export const ABOUT_FOUNDING =
  "After Vijit Dua published [an independent journal piece](https://vijitdua.com/blog/WBTZE6mR) on political polarization at UC Davis and Joshua Harris reached out to him regarding the points in the article where he disagreed with Vijit. They talked it out civilly — agreed to disagree on some points, but also found overlap on several other points and were better able to understand the premise behind each other's beliefs. They kept coming back to the same wish: that more people on this campus would learn to handle disagreements in the same manner and Common Ground Davis grew out of that conversation. The two still disagree politically, yet they co-lead the club because that *is* the point.";

/** Home page uses the same condensed lines. */
export const HOME_ABOUT_TEASE = ABOUT_CONDENSED;

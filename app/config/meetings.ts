/** Regular + one-off meetings. Edit here — no visibility flags (public repo). */

export type RegularMeeting = {
  summary: string;
  location?: string;
  durationNote?: string;
  notes?: string;
};

export type OneOffMeeting = {
  id: string;
  title: string;
  when: string;
  location?: string;
  blurb?: string;
};

/**
 * While true, Meetings skips the time ("TBD") and shows CLUB_STATUS first.
 * Turn this off once a real meeting time exists.
 */
export const REGISTERING = true;

export const CLUB_STATUS =
  "We're brand new and still registering, so we won't be an official student organization until Winter Quarter 2027.\nWe plan to host unofficial meetings and debates on Discord sooner than that.\nYou can still join those, and we'd like to see you there.";

export const REGULAR_MEETING: RegularMeeting | null = {
  summary: "TBD",
  notes: CLUB_STATUS,
};

export const ONE_OFF_MEETINGS: OneOffMeeting[] = [];

export const MEETINGS_LAST_UPDATED = "October 16, 2026";

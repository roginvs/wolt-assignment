export const DAY_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type DayOfWeek = typeof DAY_OF_WEEK[number];

export type OpeningHoursDayItem = {
  type: "open" | "close";
  value: number;
};

export type OpeningHours = Record<DayOfWeek, OpeningHoursDayItem[]>;

export type ViewOpeningHoursDay = {
  dayLabel: string;
  isToday: boolean;
  openHours: {
    start: string;
    end: string;
  }[];
};
export type ViewOpeningHours = ViewOpeningHoursDay[];

/** Using JS order of Date.getDay */
export const DAYS_OF_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export type DayOfWeek = typeof DAYS_OF_WEEK[number];

export type OpeningHoursDayItem = {
  type: "open" | "close";
  value: number;
};

export type OpeningHours = Record<DayOfWeek, OpeningHoursDayItem[]>;

export type ViewOpeningHoursRange = {
  start: string;
  end: string;
};
export type ViewOpeningHoursDay = {
  dayLabel: string;
  isToday: boolean;
  openHours: ViewOpeningHoursRange[];
};
export type ViewOpeningHours = ViewOpeningHoursDay[];

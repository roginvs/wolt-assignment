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

export type OpeningHours = Partial<Record<DayOfWeek, OpeningHoursDayItem[]>>;

export type ViewOpeningHoursRange = {
  opens: string;
  closes: string;
};
export type ViewOpeningHoursDay = {
  id: string;
  dayLabel: string;
  isToday: boolean;
  openHours: ViewOpeningHoursRange[];
};
export type ViewOpeningHours = ViewOpeningHoursDay[];

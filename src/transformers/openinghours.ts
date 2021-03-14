import { DayOfWeek, DAY_OF_WEEK, OpeningHours, ViewOpeningHours } from "./defs";
const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function transformOpeningHours(
  src: OpeningHours,
  now: Date = new Date()
): ViewOpeningHours {
  const result: ViewOpeningHours = [];

  for (const day of DAY_OF_WEEK) {
    result.push({
      dayLabel: DAY_LABELS[day],
      isToday: false,
      openHours: [],
    });
  }

  return result;
}

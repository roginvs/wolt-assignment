import {
  DayOfWeek,
  DAYS_OF_WEEK,
  OpeningHours,
  ViewOpeningHours,
} from "./defs";
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

  for (const [dayName, dayIndex] of DAYS_OF_WEEK.map(
    (dayOfWeek, index) => [dayOfWeek, index] as const
  )) {
    const isToday = now.getDay() === dayIndex;

    result.push({
      dayLabel: DAY_LABELS[dayName],
      isToday: isToday,
      openHours: [],
    });
  }

  // Push Sunday to the end
  const sunday = result.shift();
  if (!sunday) {
    throw new Error("Internal error");
  }
  result.push(sunday);

  return result;
}

import { DeepImmutable } from "../deepImmutable";
import {
  DayOfWeek,
  DAYS_OF_WEEK,
  OpeningHours,
  OpeningHoursDayItem,
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

export function cutTailFromPrevDay(
  thisDay: DeepImmutable<OpeningHoursDayItem[]>,
  prevDay: DeepImmutable<OpeningHoursDayItem[]>
): DeepImmutable<OpeningHoursDayItem[]> {
  const isHaveTailFromLastDay = thisDay[0]?.type === "close";
  if (isHaveTailFromLastDay) {
    const isPrevDayHaveCloseTail =
      prevDay.length > 0 && prevDay[prevDay.length - 1]?.type === "open";
    if (!isPrevDayHaveCloseTail) {
      throw new Error(`Previous day must contain "open" as last item`);
    }
    return thisDay.slice(1);
  } else {
    return thisDay;
  }
}

export function appendTailFromNextDay(
  thisDay: DeepImmutable<OpeningHoursDayItem[]>,
  nextDay: DeepImmutable<OpeningHoursDayItem[]>
): DeepImmutable<OpeningHoursDayItem[]> {
  const isExpectingTailOnNextDay =
    thisDay.length > 0 && thisDay[thisDay.length - 1]?.type === "open";

  if (isExpectingTailOnNextDay) {
    const nextDayStartsWith =
      nextDay.length > 0 && nextDay[0]?.type === "close"
        ? nextDay[0]
        : undefined;
    if (!nextDayStartsWith) {
      throw new Error(`Next day must contain "close" as first item`);
    }
    return [...thisDay, nextDayStartsWith];
  } else {
    return thisDay;
  }
}

export function transformOpeningHours(
  src: DeepImmutable<OpeningHours>,
  now: Date = new Date()
): DeepImmutable<ViewOpeningHours> {
  const result: ViewOpeningHours = [];

  for (const [dayName, dayIndex] of DAYS_OF_WEEK.map(
    (dayOfWeek, index) => [dayOfWeek, index] as const
  )) {
    const isToday = now.getDay() === dayIndex;
    const nextDayIndex = (dayIndex + 1) % 7;
    const prevDayIndex = (dayIndex + 6) % 7;

    const thisDay = src[dayName];
    const prevDayName = DAYS_OF_WEEK[prevDayIndex];
    if (!prevDayName) {
      throw new Error("Internal error");
    }
    const prevDay = src[prevDayName];

    const nextDayName = DAYS_OF_WEEK[nextDayIndex];
    if (!nextDayName) {
      throw new Error("Internal error");
    }
    const nextDay = src[nextDayName];

    //const thisDa

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

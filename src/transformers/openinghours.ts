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

export class InputError extends Error {
  // Nothing here
  // TODO: Check error class instance in tests
}
export class InternalError extends Error {
  public constructor() {
    super("Internal error");
  }
}

export function cutTailFromPrevDay(
  thisDay: DeepImmutable<OpeningHoursDayItem[]>,
  prevDay: DeepImmutable<OpeningHoursDayItem[]>
): DeepImmutable<OpeningHoursDayItem[]> {
  const isHaveTailFromLastDay = thisDay[0]?.type === "close";
  if (isHaveTailFromLastDay) {
    const isPrevDayHaveCloseTail =
      prevDay.length > 0 && prevDay[prevDay.length - 1]?.type === "open";
    if (!isPrevDayHaveCloseTail) {
      throw new InputError(`Previous day must contain "open" as last item`);
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
      throw new InputError(`Next day must contain "close" as first item`);
    }
    return [...thisDay, nextDayStartsWith];
  } else {
    return thisDay;
  }
}

export function checkTimeIsAsc(
  thisDay: DeepImmutable<OpeningHoursDayItem[]>
): void {
  for (let i = 0; i < thisDay.length - 1; i++) {
    const thisItem = thisDay[i];
    const nextItem = thisDay[i + 1];
    if (!thisItem || !nextItem) {
      throw new InternalError();
    }
    if (thisItem.value >= nextItem.value) {
      throw new InputError("Expecting time rangers to ascend");
    }
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
    const thisDay = src[dayName];
    checkTimeIsAsc(thisDay);

    const prevDayIndex = (dayIndex + 6) % 7;
    const prevDayName = DAYS_OF_WEEK[prevDayIndex];
    if (!prevDayName) {
      throw new InternalError();
    }
    const prevDay = src[prevDayName];

    const nextDayIndex = (dayIndex + 1) % 7;
    const nextDayName = DAYS_OF_WEEK[nextDayIndex];
    if (!nextDayName) {
      throw new InternalError();
    }
    const nextDay = src[nextDayName];

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
    throw new InternalError();
  }
  result.push(sunday);

  return result;
}

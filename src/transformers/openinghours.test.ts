import { DAYS_OF_WEEK } from "./defs";
import { transformOpeningHours } from "./openinghours";

describe("Opening hours transformer", () => {
  it(`Timezone is ok`, () => expect(new Date().getTimezoneOffset()).toBe(-120));

  for (const dayId of [0, 1, 2, 3, 4, 5, 6]) {
    it(`Closed all days, today is ${DAYS_OF_WEEK[dayId]}`, () => {
      const now = new Date(`2021-03-${14 + dayId}T16:04:37.974Z`);
      expect(now.getDay()).toBe(dayId);

      expect(
        transformOpeningHours(
          {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
          },
          now
        )
      ).toEqual([
        { dayLabel: "Monday", isToday: dayId === 1, openHours: [] },
        { dayLabel: "Tuesday", isToday: dayId === 2, openHours: [] },
        { dayLabel: "Wednesday", isToday: dayId === 3, openHours: [] },
        { dayLabel: "Thursday", isToday: dayId === 4, openHours: [] },
        { dayLabel: "Friday", isToday: dayId === 5, openHours: [] },
        { dayLabel: "Saturday", isToday: dayId === 6, openHours: [] },
        { dayLabel: "Sunday", isToday: dayId === 7, openHours: [] },
      ]);
    });
  }
});

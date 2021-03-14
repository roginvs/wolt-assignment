import { isMainThread } from "worker_threads";
import { transformOpeningHours } from "./openinghours";

describe("Opening hours transformer", () => {
  it("Closed all days", () => {
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
        new Date("2021-03-14T16:04:37.974Z")
      )
    ).toEqual([
      { dayLabel: "Monday", isToday: false, openHours: [] },
      { dayLabel: "Tuesday", isToday: false, openHours: [] },
      { dayLabel: "Wednesday", isToday: false, openHours: [] },
      { dayLabel: "Thursday", isToday: false, openHours: [] },
      { dayLabel: "Friday", isToday: false, openHours: [] },
      { dayLabel: "Saturday", isToday: false, openHours: [] },
      { dayLabel: "Sunday", isToday: true, openHours: [] },
    ]);
  });
});

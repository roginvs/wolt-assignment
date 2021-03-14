import { DAYS_OF_WEEK } from "./defs";
import {
  appendTailFromNextDay,
  checkTimeIsAscAndInterleaving,
  cutTailFromPrevDay,
  transformOpeningHours,
} from "./openinghours";

describe("Opening hours transformer", () => {
  describe("Helper function cutTailFromPrevDay", () => {
    it(`Empty items`, () => expect(cutTailFromPrevDay([], [])).toEqual([]));
    it(`No tail from previous day`, () =>
      expect(
        cutTailFromPrevDay(
          [
            {
              type: "open",
              value: 100,
            },
            {
              type: "close",
              value: 200,
            },
          ],
          []
        )
      ).toEqual([
        {
          type: "open",
          value: 100,
        },
        {
          type: "close",
          value: 200,
        },
      ]));

    it(`Throws if no tail from previous day`, () =>
      expect(() =>
        cutTailFromPrevDay(
          [
            {
              type: "close",
              value: 50,
            },
            {
              type: "open",
              value: 200,
            },
            {
              type: "close",
              value: 300,
            },
          ],
          []
        )
      ).toThrow('Previous day must contain "open" as last item'));

    it(`Have tail from previous day`, () =>
      expect(
        cutTailFromPrevDay(
          [
            {
              type: "close",
              value: 50,
            },
            {
              type: "open",
              value: 200,
            },
            {
              type: "close",
              value: 300,
            },
          ],
          [{ type: "open", value: 1000 }]
        )
      ).toEqual([
        {
          type: "open",
          value: 200,
        },
        {
          type: "close",
          value: 300,
        },
      ]));
  });

  describe("Helper function appendTailFromNextDay", () => {
    it(`Empty items`, () => expect(appendTailFromNextDay([], [])).toEqual([]));
    it(`No tail to the next day`, () =>
      expect(
        appendTailFromNextDay(
          [
            {
              type: "open",
              value: 100,
            },
            {
              type: "close",
              value: 200,
            },
          ],
          []
        )
      ).toEqual([
        {
          type: "open",
          value: 100,
        },
        {
          type: "close",
          value: 200,
        },
      ]));

    it(`Throws if no tail on the next day`, () =>
      expect(() =>
        appendTailFromNextDay(
          [
            {
              type: "open",
              value: 1000,
            },
          ],
          []
        )
      ).toThrow('Next day must contain "close" as first item'));

    it(`Have tail from previous day`, () =>
      expect(
        appendTailFromNextDay(
          [
            {
              type: "open",
              value: 1000,
            },
          ],
          [{ type: "close", value: 10 }]
        )
      ).toEqual([
        {
          type: "open",
          value: 1000,
        },
        {
          type: "close",
          value: 10,
        },
      ]));
  });

  describe("Helper checkTimeIsAscAndInterleaving", () => {
    it("Empty data", () =>
      expect(() => checkTimeIsAscAndInterleaving([])).not.toThrow());

    it("One item", () =>
      expect(() =>
        checkTimeIsAscAndInterleaving([{ type: "open", value: 1 }])
      ).not.toThrow());

    it("Ascending", () =>
      expect(() =>
        checkTimeIsAscAndInterleaving([
          { type: "open", value: 1 },
          { type: "close", value: 2 },
        ])
      ).not.toThrow());

    it("Ascending but not interleaving", () =>
      expect(() =>
        checkTimeIsAscAndInterleaving([
          { type: "open", value: 1 },
          { type: "open", value: 2 },
        ])
      ).toThrow("Items are not interleaving"));

    it("Not ascending", () =>
      expect(() =>
        checkTimeIsAscAndInterleaving([
          { type: "open", value: 1 },
          { type: "open", value: 1 },
        ])
      ).toThrow("Expecting time rangers to ascend"));
  });

  const emptyBase = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  } as const;

  describe("Closed all days", () => {
    for (const dayId of [0, 1, 2, 3, 4, 5, 6]) {
      it(`Today is ${DAYS_OF_WEEK[dayId]}`, () => {
        expect(transformOpeningHours(emptyBase, { dayIndex: dayId })).toEqual([
          { dayLabel: "Monday", isToday: dayId === 1, openHours: [] },
          { dayLabel: "Tuesday", isToday: dayId === 2, openHours: [] },
          { dayLabel: "Wednesday", isToday: dayId === 3, openHours: [] },
          { dayLabel: "Thursday", isToday: dayId === 4, openHours: [] },
          { dayLabel: "Friday", isToday: dayId === 5, openHours: [] },
          { dayLabel: "Saturday", isToday: dayId === 6, openHours: [] },
          { dayLabel: "Sunday", isToday: dayId === 0, openHours: [] },
        ]);
      });
    }
  });
});

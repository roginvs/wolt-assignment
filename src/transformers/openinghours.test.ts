import { DAYS_OF_WEEK } from "./defs";
import {
  appendTailFromNextDay,
  checkTimeIsAscAndInterleaving,
  cutTailFromPrevDay,
  transformOpeningHours,
  transformSecondsFromMidnight,
} from "./openinghours";

describe("Opening hours transformer", () => {
  describe(`DAYS_OF_WEEK const health-check`, () => {
    it(`List is started from Sunday because JS getDay does so`, () =>
      expect(DAYS_OF_WEEK[0]).toBe("sunday"));
    it(`There are 7 days`, () => expect(DAYS_OF_WEEK.length).toBe(7));
  });
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

  describe("Closed all days, all days are present", () => {
    for (const dayId of [0, 1, 2, 3, 4, 5, 6]) {
      it(`Today is ${DAYS_OF_WEEK[dayId]}`, () => {
        const dayName = DAYS_OF_WEEK[dayId];
        if (!dayName) {
          throw new Error("Unexpected error");
        }

        expect(transformOpeningHours(emptyBase, { dayName })).toEqual([
          {
            dayName: "monday",
            isToday: dayId === 1,
            openHours: [],
          },
          {
            dayName: "tuesday",
            isToday: dayId === 2,
            openHours: [],
          },
          {
            dayName: "wednesday",
            isToday: dayId === 3,
            openHours: [],
          },
          {
            dayName: "thursday",
            isToday: dayId === 4,
            openHours: [],
          },
          {
            dayName: "friday",
            isToday: dayId === 5,
            openHours: [],
          },
          {
            dayName: "saturday",
            isToday: dayId === 6,
            openHours: [],
          },
          {
            dayName: "sunday",
            isToday: dayId === 0,
            openHours: [],
          },
        ]);
      });
    }
  });

  describe("Closed all days, no days are present", () => {
    for (const dayId of [0, 1, 2, 3, 4, 5, 6]) {
      it(`Today is ${DAYS_OF_WEEK[dayId]}`, () => {
        const dayName = DAYS_OF_WEEK[dayId];
        if (!dayName) {
          throw new Error("Unexpected error");
        }
        expect(transformOpeningHours({}, { dayName })).toEqual([
          {
            dayName: "monday",
            isToday: dayId === 1,
            openHours: [],
          },
          {
            dayName: "tuesday",
            isToday: dayId === 2,
            openHours: [],
          },
          {
            dayName: "wednesday",
            isToday: dayId === 3,
            openHours: [],
          },
          {
            dayName: "thursday",
            isToday: dayId === 4,
            openHours: [],
          },
          {
            dayName: "friday",
            isToday: dayId === 5,
            openHours: [],
          },
          {
            dayName: "saturday",
            isToday: dayId === 6,
            openHours: [],
          },
          {
            dayName: "sunday",
            isToday: dayId === 0,
            openHours: [],
          },
        ]);
      });
    }
  });

  describe("Helper transformSecondsFromMidnight", () => {
    it(`Throws on wrong values`, () => {
      expect(() => transformSecondsFromMidnight(-1)).toThrow(
        "Value must be greater than zero"
      );
      expect(() => transformSecondsFromMidnight(60 * 60 * 24)).toThrow(
        "Value must be lower 86400"
      );
    });

    const testCases = [
      [32400, "9 AM"],
      [0, "12 AM"],
      [37800, "10.30 AM"],
      [12 * 60 * 60, "12 PM"],
      [12 * 60 * 60 + 43 * 60, "12.43 PM"],
      [12 * 60 * 60 + 1 * 60, "12.01 PM"],
      [60 * 60 * 24 - 2, "11.59:58 PM"],
      [60 * 60 * 24 - 1, "12 PM"],
      [0 * 60 * 60 + 3 * 60 + 4, "12.03:04 AM"],
      [0 * 60 * 60 + 53 * 60 + 24, "12.53:24 AM"],
      [1 * 60 * 60 + 3 * 60 + 4, "1.03:04 AM"],
      [3 * 60 * 60 + 53 * 60 + 24, "3.53:24 AM"],
      [23 * 60 * 60 + 53 * 60 + 24, "11.53:24 PM"],
    ] as const;
    for (const [value, expected] of testCases) {
      it(`${value} -> ${expected}`, () =>
        expect(transformSecondsFromMidnight(value)).toBe(expected));
    }
  });

  describe("Real examples", () => {
    it("Friday and Saturday", () => {
      expect(
        transformOpeningHours(
          {
            friday: [
              {
                type: "open",
                value: 64800,
              },
            ],
            saturday: [
              {
                type: "close",
                value: 3600,
              },
              {
                type: "open",
                value: 32400,
              },
              {
                type: "close",
                value: 39600,
              },
              {
                type: "open",
                value: 57600,
              },
              {
                type: "close",
                value: 82800,
              },
            ],
          },
          { dayName: "monday" }
        )
      ).toEqual([
        { dayName: "monday", isToday: true, openHours: [] },
        { dayName: "tuesday", isToday: false, openHours: [] },
        {
          dayName: "wednesday",
          isToday: false,
          openHours: [],
        },
        { dayName: "thursday", isToday: false, openHours: [] },
        {
          dayName: "friday",
          isToday: false,
          openHours: [
            {
              opens: "6 PM",
              closes: "1 AM",
            },
          ],
        },
        {
          dayName: "saturday",
          isToday: false,
          openHours: [
            {
              opens: "9 AM",
              closes: "11 AM",
            },
            {
              opens: "4 PM",
              closes: "11 PM",
            },
          ],
        },
        { dayName: "sunday", isToday: false, openHours: [] },
      ]);
    });

    it(`Full data formatting example`, () => {
      const data = transformOpeningHours(
        {
          monday: [],
          tuesday: [
            { type: "open", value: 36000 },
            { type: "close", value: 64800 },
          ],
          wednesday: [],
          thursday: [
            { type: "open", value: 36000 },
            { type: "close", value: 64800 },
          ],
          friday: [{ type: "open", value: 36000 }],
          saturday: [
            { type: "close", value: 3600 },
            { type: "open", value: 36000 },
          ],
          sunday: [
            { type: "close", value: 3600 },
            { type: "open", value: 43200 },
            { type: "close", value: 75600 },
          ],
        },
        { dayName: "friday" }
      );

      const expected = [
        { dayName: "monday", isToday: false, openHours: [] },
        {
          dayName: "tuesday",
          isToday: false,
          openHours: [{ opens: "10 AM", closes: "6 PM" }],
        },
        {
          dayName: "wednesday",
          isToday: false,
          openHours: [],
        },
        {
          dayName: "thursday",
          isToday: false,
          openHours: [{ opens: "10 AM", closes: "6 PM" }],
        },
        {
          dayName: "friday",
          isToday: true,
          openHours: [{ opens: "10 AM", closes: "1 AM" }],
        },
        {
          dayName: "saturday",
          isToday: false,
          openHours: [{ opens: "10 AM", closes: "1 AM" }],
        },
        {
          dayName: "sunday",
          isToday: false,
          openHours: [{ opens: "12 PM", closes: "9 PM" }],
        },
      ];

      expect(data).toEqual(expected);
    });
  });
});

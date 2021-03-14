import { OpeningHours } from "../transformers/defs";

export const SAMPLE_OPENING_HOURS: OpeningHours = {
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

    // I used this to check how it looks if there are 2 ranges in the same day
    /*
    { type: "open", value: 75600 + 60 * 60 },
    { type: "close", value: 75600 + 60 * 60 * 2 },
    */
  ],
};

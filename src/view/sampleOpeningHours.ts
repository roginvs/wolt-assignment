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
  ],
};
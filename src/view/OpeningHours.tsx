import * as React from "react";
import { OpeningHours } from "../transformers/defs";
import { transformOpeningHours } from "../transformers/openinghours";

export function OpeningHoursUi(props: {
  openingHours: OpeningHours;
  nowDayIndex: number;
}) {
  const data = transformOpeningHours(props.openingHours, {
    dayIndex: props.nowDayIndex,
  });

  return <div>todo</div>;
}

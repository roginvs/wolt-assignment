import * as React from "react";
import { OpeningHours } from "../transformers/defs";
import { transformOpeningHours } from "../transformers/openinghours";
import { FaRegClock } from "react-icons/fa";

export function OpeningHoursUi(props: {
  openingHours: OpeningHours;
  nowDayIndex: number;
}) {
  const data = transformOpeningHours(props.openingHours, {
    dayIndex: props.nowDayIndex,
  });

  return (
    <div>
      todo
      <FaRegClock /> 2
    </div>
  );
}

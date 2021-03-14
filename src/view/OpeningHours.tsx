import * as React from "react";
import { OpeningHours } from "../transformers/defs";
import { transformOpeningHours } from "../transformers/openinghours";
import { FaRegClock } from "react-icons/fa";
import styled from "styled-components";
import { palette } from "./palette";
import { Card, CardHeader } from "./Card";

const Header = styled(CardHeader)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const ClockIcon = styled(FaRegClock)({
  color: palette.grey3,
  marginRight: 15,
});

export const ListItem = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottom: `1px solid ${palette.grey2}`,
});

export function OpeningHoursUi(props: {
  openingHours: OpeningHours;
  nowDayIndex: number;
}) {
  const data = transformOpeningHours(props.openingHours, {
    dayIndex: props.nowDayIndex,
  });

  return (
    <Card>
      <Header>
        <ClockIcon /> <span>Opening hours</span>
      </Header>
      {data.map((day) => (
        <ListItem key={day.id}>{day.dayLabel}</ListItem>
      ))}
    </Card>
  );
}

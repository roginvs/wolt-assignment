import * as React from "react";
import { DayOfWeek, OpeningHours } from "../transformers/defs";
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

const ListItem = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  borderBottom: `1px solid ${palette.grey2}`,
  fontSize: 16,
  lineHeight: "22px",
  paddingTop: 5,
  paddingBottom: 5,
});

const DayLabel = styled("span")({
  fontWeight: 500,
});

const Today = styled("span")({
  color: palette.green,
  textTransform: "uppercase",
  fontSize: 12,
  lineHeight: "16px",
  marginLeft: 10,
  fontWeight: 700,
});

const Closed = styled("span")({
  marginLeft: "auto",
  color: palette.grey3,
  paddingLeft: 30,
});

const HoursRanges = styled("span")({
  marginLeft: "auto",
  color: palette.black,
  paddingLeft: 30,
});

const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function OpeningHoursUi(props: {
  openingHours: OpeningHours;
  nowDay: DayOfWeek;
}) {
  const data = transformOpeningHours(props.openingHours, {
    dayName: props.nowDay,
  });

  return (
    <Card>
      <Header>
        <ClockIcon /> <span>Opening hours</span>
      </Header>
      {data.map((day) => (
        <ListItem key={day.dayName}>
          <DayLabel>{DAY_LABELS[day.dayName]}</DayLabel>
          {day.isToday && <Today>today</Today>}

          {day.openHours.length === 0 ? (
            <Closed>Closed</Closed>
          ) : (
            <HoursRanges>
              {day.openHours
                .map(
                  (openHoursRange) =>
                    `${openHoursRange.opens} - ${openHoursRange.closes}`
                )
                .join(", ")}
            </HoursRanges>
          )}
        </ListItem>
      ))}
    </Card>
  );
}

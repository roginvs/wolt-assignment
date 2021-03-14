import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { OpeningHoursUi } from "./OpeningHours";
import { SAMPLE_OPENING_HOURS } from "./sampleOpeningHours";

const GlobalStyle = createGlobalStyle`
@import "https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap";

* {
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    text-rendering: optimizelegibility;
    height: 100%;
    width: 100%;
}

html {
    height: 100%
}

body > div {
    height: 100%
}
`;

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <OpeningHoursUi openingHours={SAMPLE_OPENING_HOURS} todayDayId={4} />
      </Container>
    </>
  );
}

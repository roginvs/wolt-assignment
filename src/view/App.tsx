import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { OpeningHoursUi } from "./OpeningHours";
import { palette } from "./palette";
import { SAMPLE_OPENING_HOURS } from "./sampleOpeningHours";

const GlobalStyle = createGlobalStyle`
@import "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap";

* {
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    text-rendering: optimizelegibility;
    height: 100%;
    width: 100%;
    letter-spacing: 0px;
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
  backgroundColor: palette.grey1,
});

export function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <OpeningHoursUi openingHours={SAMPLE_OPENING_HOURS} nowDayIndex={4} />
      </Container>
    </>
  );
}

import * as React from "react";

import styled from "styled-components";
import { palette } from "./palette";

export const Card = styled("div")({
  padding: 30,
  borderRadius: 10,
  backgroundColor: palette.white,
  boxShadow: `0px 0px 8px 2px rgb(0,0,0,0.1)`,
  color: palette.black,
});

export const CardHeader = styled("h2")({
  marginTop: 0,
  marginBottom: 0,
  fontWeight: "bold",
  fontSize: 24,
  lineHeight: "30px",
  borderBottom: `1px solid ${palette.black}`,
});

import { css } from "@emotion/core";
import { colors } from "./constants";

export const GlobalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    color: ${colors.textColor};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactElement } from "react";

const iconStyles = css`
  display: flex;
  padding: 8px;
  box-sizing: border-box;
  justify-content: center;
`;

export const Icon = ({ children }: { children: ReactElement }) => (
  <div css={iconStyles}>{children}</div>
);

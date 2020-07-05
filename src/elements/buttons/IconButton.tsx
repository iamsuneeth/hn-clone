// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: ReactElement;
}

const buttonStyle = css`
  background: none;
  padding: 0;
  border: 0;
  :hover {
    cursor: pointer;
  }
`;

export const IconButton = ({ icon }: IconButtonProps) => {
  return <button css={buttonStyle}>{icon}</button>;
};

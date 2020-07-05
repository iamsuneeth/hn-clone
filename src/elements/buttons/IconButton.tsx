/** @jsx jsx */
import { ReactElement } from "react";
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

export const IconButton = ({ icon, ...props }: IconButtonProps) => {
  return (
    <button css={buttonStyle} {...props}>
      {icon}
    </button>
  );
};

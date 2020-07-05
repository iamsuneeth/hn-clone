/** @jsx jsx */
import { css, jsx } from "@emotion/core";
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const buttonStyle = css`
  background: none;
  padding: 0;
  border: 0;
  :hover {
    cursor: pointer;
  }
`;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button css={buttonStyle} {...props}>
      {children}
    </button>
  );
};

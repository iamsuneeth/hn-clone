/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Icon } from "./icon";
import { colors } from "../../../theme/constants";

const caretStyle = css`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  border-bottom: 5px solid ${colors.textColorSecondary};
`;

export const Caret = () => {
  return (
    <Icon>
      <div css={caretStyle}></div>
    </Icon>
  );
};

import React from "react";
import { Icon } from "./icon";
import { ReactComponent as CaretSVG } from "../../images/caret-arrow-up.svg";

export interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const Caret = ({ size = 20, ...props }: SvgProps) => {
  return (
    <Icon>
      <CaretSVG
        height={size}
        width={size}
        aria-hidden="true"
        focusable="false"
        fill="#888"
        {...props}
      />
    </Icon>
  );
};

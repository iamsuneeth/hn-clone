import React from "react";
import { ReactElement } from "react";
import { Button } from "./Button";
interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: ReactElement;
}

export const IconButton = ({ icon, ...props }: IconButtonProps) => {
  return <Button {...props}>{icon}</Button>;
};

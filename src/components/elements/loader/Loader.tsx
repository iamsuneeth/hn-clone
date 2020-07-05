// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import Loader from "react-loader-spinner";
import { colors } from "../../../theme/constants";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const loaderStyles = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Spinner = () => (
  <div css={loaderStyles}>
    <Loader type="Bars" color={colors.primary} height={100} width={100} />
  </div>
);

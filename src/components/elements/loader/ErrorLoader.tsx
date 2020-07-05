// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import Loader from "react-loader-spinner";
import { colors } from "../../../theme/constants";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button } from "../buttons/Button";

const loaderStyles = css``;

const buttonStyle = css`
  background-color: ${colors.primary};
  color: ${colors.textWhite};
  padding: 0.5rem 1rem;
  border-radius: 3px;
`;

export const ErrorLoader = () => (
  <div css={loaderStyles}>
    <Loader
      type="MutatingDots"
      color={colors.primary}
      height={100}
      width={100}
    />
    <Button
      aria-label="reload page"
      css={buttonStyle}
      onClick={() => window.location.reload()}
    >
      Reload Page
    </Button>
  </div>
);

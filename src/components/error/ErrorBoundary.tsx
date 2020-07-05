/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, ErrorInfo } from "react";
import { ErrorLoader } from "../elements/loader/ErrorLoader";
import { css, jsx } from "@emotion/core";

const errorContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export class AppErrorboundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: any) {
    return {
      error,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div css={errorContainer}>
          <h1>Uh oh!! Something has broken</h1>
          <ErrorLoader />
        </div>
      );
    }
    return this.props.children;
  }
}

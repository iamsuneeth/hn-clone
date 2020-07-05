import React, { ReactElement } from "react";
import { MediaContextProvider, Media } from "../../providers/MediaProvider";

/**
 * Universal implementation - support SSR ,thanks to @artsy/fresnel
 */

interface ResponsiveProps {
  desktop?: ReactElement | null;
  tablet?: ReactElement | null;
  all?: ReactElement | null;
  mobile?: ReactElement | null;
}

export const Responsive = ({
  mobile,
  tablet = null,
  desktop = null,
  all = null,
}: ResponsiveProps) => {
  if (all) {
    if (!tablet) {
      tablet = all;
    }
    if (!desktop) {
      desktop = all;
    }
    if (!mobile) {
      mobile = all;
    }
  }
  if (!all && !tablet && !desktop && !mobile) {
    throw new Error("Atleast one component should be defined");
  }
  return (
    <MediaContextProvider>
      <Media between={["xs", "md"]}>{mobile}</Media>
      <Media at="md">{tablet}</Media>
      <Media greaterThanOrEqual="lg">{desktop}</Media>
    </MediaContextProvider>
  );
};

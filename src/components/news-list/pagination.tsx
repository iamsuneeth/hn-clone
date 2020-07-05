/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { colors } from "../../theme/constants";
import { Link } from "react-router-dom";

const seperator = css`
  color: ${colors.primary};
  padding: 0 0.2rem;
`;

const paginationContainer = css`
  display: flex;
  justify-content: flex-end;
  padding: 0.2rem;
  @media screen and (max-width: 767px) {
    justify-content: center;
  }
  a {
    color: ${colors.primary};
    text-decoration: none;
    &:visited,
    &:active,
    &:focus,
    &:link {
      color: ${colors.primary};
    }
  }
`;

interface PaginationProps {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
}

export const Pagination = ({
  hasPrevPage,
  hasNextPage,
  currentPage,
}: PaginationProps) => {
  return (
    <div css={paginationContainer}>
      {hasPrevPage && (
        <Link to={`/${currentPage === 1 ? "" : currentPage - 1}`}>
          Previous
        </Link>
      )}
      {hasNextPage && hasPrevPage && <span css={seperator}>|</span>}
      {hasNextPage && <Link to={`/${currentPage + 1}`}>Next</Link>}
    </div>
  );
};

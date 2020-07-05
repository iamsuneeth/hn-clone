// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { News } from "../pages/Home";
import TimeAgo from "react-timeago";
import { Caret } from "../../elements/icons/caret";
import { IconButton } from "../../elements/buttons/IconButton";
import { Link } from "react-router-dom";
import { colors } from "../../theme/constants";

const commonRowStyle = css`
  display: flex;
  align-items: center;
  & > div {
    padding: 0.1rem 0.5rem;
    min-width: 5rem;
    text-align: center;
    &:last-child {
      flex: 1;
      text-align: left;
    }
  }
`;

const tableHeaderRowStyle = css`
  ${commonRowStyle};
  background-color: ${colors.primary};
  color: ${colors.textWhite};
`;

const tableContainerStyle = css`
  background-color: ${colors.background};
  margin: 0.5rem 0;
`;

const tableRowStyle = css`
  ${commonRowStyle}
  &:nth-of-type(2n) {
    background-color: ${colors.alternateBackground};
  }
`;

const secondaryStyle = css`
  color: ${colors.textColorSecondary};
`;

const newsDetailStyle = css`
  display: flex;
  & > div {
    & > span {
      padding: 0 0.1rem;
    }
  }
  & > span {
    padding: 0 0.1rem;
  }

  @media screen and (max-width: 1079px) {
    flex-direction: column;
  }
`;

const hideButtonStyle = css`
  background: none;
  border: 0;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const seperator = css`
  color: ${colors.primary};
  padding: 0 0.2rem;
`;

const paginationContainer = css`
  display: flex;
  justify-content: flex-end;
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

interface newsListProps {
  items: News[];
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  upVote: (id: string) => void;
  hide: (id: string) => void;
}

export const NewsList = ({
  items,
  hasNextPage,
  hasPrevPage,
  currentPage,
  hide,
  upVote,
}: newsListProps) => {
  return (
    <div css={tableContainerStyle} role="table" aria-label="newslist">
      <div className="tableheader" role="rowgroup" css={tableHeaderRowStyle}>
        <div className="headercol" role="columnheader">
          Comments
        </div>
        <div className="headercol" role="columnheader">
          Vote Count
        </div>
        <div className="headercol" role="columnheader">
          Upvote
        </div>
        <div className="headercol" role="columnheader">
          News Details
        </div>
      </div>
      <div className="tablebody">
        {items.map((item) => {
          const url = item.url ? new URL(item.url) : null;
          return (
            <div css={tableRowStyle} key={item.objectID}>
              <div className="bodycol">{item.num_comments}</div>
              <div className="bodycol">{item.points}</div>
              <div className="bodycol">
                <IconButton
                  icon={
                    <Caret size={10} onClick={() => upVote(item.objectID)} />
                  }
                />
              </div>
              <div className="bodycol" css={newsDetailStyle}>
                <div>
                  <span>{item.title}</span>
                  {url && <span css={secondaryStyle}>{`(${url.host})`}</span>}
                </div>
                <div>
                  <span css={secondaryStyle}>by</span>
                  <span>{item.author}</span>
                  <span css={secondaryStyle}>
                    <TimeAgo date={item.created_at} />
                  </span>
                  <span>
                    [
                    <button
                      css={hideButtonStyle}
                      onClick={() => hide(item.objectID)}
                    >
                      Hide
                    </button>
                    ]
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div css={paginationContainer}>
        {hasPrevPage && (
          <Link to={`/${currentPage === 1 ? "" : currentPage - 1}`}>
            Previous
          </Link>
        )}
        {hasNextPage && hasPrevPage && <span css={seperator}>|</span>}
        {hasNextPage && <Link to={`/${currentPage + 1}`}>Next</Link>}
      </div>
    </div>
  );
};

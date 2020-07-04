// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { News } from "../pages/Home";
import TimeAgo from "react-timeago";

const tableHeaderStyle = css`
  display: flex;
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

const tableBodyStyle = css``;

const tableRowStyle = css`
  ${tableHeaderStyle}
`;

interface newsListProps {
  items: News[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const NewsList = ({ items }: newsListProps) => {
  return (
    <div className="tablecontainer" role="table" aria-label="newslist">
      <div className="tableheader" role="rowgroup" css={tableHeaderStyle}>
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
      <div className="tablebody" css={tableBodyStyle}>
        {items.map((item) => {
          const url = item.url ? new URL(item.url) : null;
          return (
            <div css={tableRowStyle}>
              <div className="bodycol">{item.num_comments}</div>
              <div className="bodycol">{item.points}</div>
              <div className="bodycol">^</div>
              <div className="bodycol">
                <span>{item.title}</span>
                {url && <span>{`(${url.host})`}</span>}
                <span>by</span>
                <span>{item.author}</span>
                <span>
                  <TimeAgo date={item.created_at} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

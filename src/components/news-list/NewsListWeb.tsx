/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import TimeAgo from "react-timeago";
import { Caret } from "../../elements/icons/caret";
import { IconButton } from "../../elements/buttons/IconButton";
import { colors } from "../../theme/constants";
import { newsListProps } from "../home/NewsList";
import { Pagination } from "./pagination";

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
  font-size: 90%;
`;

const newsDetailStyle = css`
  display: flex;
  flex-wrap: wrap;
  & > div {
    & > span {
      padding: 0 0.1rem;
    }
  }
  & > span {
    padding: 0 0.1rem;
  }
  a {
    text-decoration: none;
    color: ${colors.textColorSecondary};
    :hover {
      text-decoration: underline;
      text-decoration-color: inherit;
    }
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

export const NewsListWeb = ({
  items,
  hasNextPage,
  hasPrevPage,
  currentPage,
  hide,
  upVote,
}: newsListProps) => {
  return (
    <div css={tableContainerStyle} role="table" aria-label="newslist">
      <div role="rowgroup" css={tableHeaderRowStyle}>
        <div role="columnheader">Comments</div>
        <div role="columnheader">Vote Count</div>
        <div role="columnheader">Upvote</div>
        <div role="columnheader">News Details</div>
      </div>
      <div>
        {items.map((item) => {
          const url = item.url ? new URL(item.url) : null;
          return (
            <div css={tableRowStyle} key={item.objectID}>
              <div>{item.num_comments}</div>
              <div>{item.points}</div>
              <div>
                <IconButton
                  icon={<Caret />}
                  onClick={() => upVote(item.objectID)}
                />
              </div>
              <div css={newsDetailStyle}>
                <div>
                  <span>{item.title}</span>
                  {url && (
                    <a href={item.url}>
                      <span css={secondaryStyle}>{`(${url.host})`}</span>
                    </a>
                  )}
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
      <Pagination
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        currentPage={currentPage}
      />
    </div>
  );
};

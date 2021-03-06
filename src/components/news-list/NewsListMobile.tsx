/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { newsListProps } from "../home/NewsList";
import { colors } from "../../theme/constants";
import { IconButton } from "../elements/buttons/IconButton";
import { Caret } from "../elements/icons/caret";
import ReactTimeago from "react-timeago";
import { Pagination } from "./pagination";
import { Button } from "../elements/buttons/Button";

const listContainerStyle = css`
  font-size: 90%;
  margin-bottom: 1rem;
`;
const listHeaderStyle = css`
  min-height: 3rem;
`;
const listbodyStyle = css`
  padding-top: 0.5rem;
  background-color: ${colors.background};
`;

const rowStyle = css`
  padding: 0.5rem 0;
  &:nth-of-type(2n) {
    background-color: ${colors.alternateBackground};
  }
`;

const heroRowStyles = css`
  display: flex;
  align-items: flex-start;
  > div {
    &:last-of-type {
      flex: 1;
    }
  }
`;

const secondaryStyle = css`
  font-size: 90%;
  color: ${colors.textColorSecondary};
  > * {
    padding: 0 0.1rem;
  }
`;

const hideButtonStyle = css`
  &:hover {
    text-decoration: underline;
  }
`;

export const NewsListMobile = ({
  items,
  upVote,
  hide,
  hasNextPage,
  hasPrevPage,
  currentPage,
}: newsListProps) => {
  return (
    <div
      css={listContainerStyle}
      role="table"
      aria-label="newslist"
      data-id="mobile"
    >
      <div css={listHeaderStyle}></div>
      <div css={listbodyStyle}>
        {items.map((item) => {
          return (
            <div css={rowStyle} key={item.objectID}>
              <div css={heroRowStyles}>
                <div>
                  <IconButton
                    aria-label="upvote"
                    icon={<Caret />}
                    onClick={() => upVote(item.objectID)}
                  />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div css={secondaryStyle}>
                    <span>{`${item.points} by ${item.author}`}</span>
                    <ReactTimeago date={item.created_at} />
                    <span>
                      [
                      <Button
                        aria-label="hide news"
                        css={hideButtonStyle}
                        onClick={() => hide(item.objectID)}
                      >
                        Hide
                      </Button>
                      ]
                    </span>
                  </div>
                  <div css={secondaryStyle}>
                    <span>{`${item.num_comments} comments`}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <Pagination
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

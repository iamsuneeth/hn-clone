/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { NewsList } from "./NewsList";
import { NewsChart } from "./NewsChart";
import { News, PageInfo } from "../pages/Home";

interface DashboardProps {
  items: News[];
  pageInfo: PageInfo | undefined;
  isWide: boolean;
  upVote: (id: string) => void;
  hide: (id: string) => void;
}

const dashboardStyle = css`
  max-width: 1280px;
  margin: 0 auto;
  background-color: #ff6600;
`;

export const Dashboard = ({
  items,
  pageInfo,
  isWide,
  upVote,
  hide,
}: DashboardProps) => {
  if (items.length === 0 || !pageInfo) {
    return null;
  }
  return (
    <div css={dashboardStyle}>
      <NewsList
        items={items}
        hasNextPage={pageInfo.pages - 1 !== pageInfo.currentPage}
        hasPrevPage={pageInfo.currentPage !== 0}
        currentPage={pageInfo.currentPage}
        hide={hide}
        upVote={upVote}
      />
      {isWide && <NewsChart items={items} />}
    </div>
  );
};

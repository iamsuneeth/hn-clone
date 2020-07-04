import React from "react";
import { NewsList } from "./NewsList";
import { NewsChart } from "./NewsChart";
import { News, PageInfo } from "../pages/Home";

interface DashboardProps {
  items: News[];
  pageInfo: PageInfo | undefined;
}

export const Dashboard = ({ items, pageInfo }: DashboardProps) => {
  //state
  //filter hidden upvote
  if (items.length === 0 || !pageInfo) {
    return null;
  }
  return (
    <div>
      <NewsList
        items={items}
        hasNextPage={pageInfo.pages - 1 !== pageInfo.currentPage}
        hasPrevPage={pageInfo.currentPage !== 0}
      />
      <NewsChart items={items} />
    </div>
  );
};

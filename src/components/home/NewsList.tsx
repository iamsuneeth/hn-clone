import React from "react";
import { News } from "../pages/Home";
import { Responsive } from "../../elements/layout/Responsive";
import { NewsListWeb } from "../news-list/NewsListWeb";
import { NewsListMobile } from "../news-list/NewsListMobile";

export interface newsListProps {
  items: News[];
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  upVote: (id: string) => void;
  hide: (id: string) => void;
}

export const NewsList = (props: newsListProps) => {
  return (
    <Responsive
      desktop={<NewsListWeb {...props} />}
      all={<NewsListMobile {...props} />}
    />
  );
};

import React from "react";
import { RouteComponentProps } from "react-router-dom";
import useSWR from "swr";
import { ListFetcher } from "../../api/request";
import { Dashboard } from "../home/Dashboard";

export interface News {
  num_comments: number;
  objectID: string;
  points: number;
  title: string;
  url: string;
  author: string;
  created_at: string;
}

export interface NewsData {
  hits: News[];
  hitsPerPage: number;
  nbPages: number;
  page: number;
}

export interface PageInfo {
  currentPage: number;
  pages: number;
  perPage: number;
}

export const Home = ({ match }: RouteComponentProps<{ id: string }>) => {
  const { data } = useSWR<NewsData>(
    `search?tags=story${match.params.id ? `?page=${match.params.id}` : ""}`,
    ListFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const pageInfo = data && {
    currentPage: data.page,
    pages: data?.nbPages,
    perPage: data?.hitsPerPage,
  };

  return <Dashboard items={data?.hits || []} pageInfo={pageInfo} />;
};

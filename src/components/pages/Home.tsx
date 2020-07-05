import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import useSWR from "swr";
import { useMedia } from "react-use";
import { get, set } from "idb-keyval";
import { ListFetcher } from "../../api/request";
import { Dashboard } from "../home/Dashboard";
import { IDBKeys } from "../../constants/storage";

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

interface HomeState {
  votes: { [key: string]: number };
  hidden: { [key: string]: boolean };
}

const filterNews = (
  { votes, hidden }: HomeState,
  data: NewsData | undefined
): News[] => {
  if (!data) {
    return [];
  }
  const visibleData = data.hits.filter((news) => !hidden[news.objectID]);
  return visibleData.map((news) => {
    return {
      ...news,
      points: news.points + (votes[news.objectID] || 0),
    };
  });
};

export const Home = ({ match }: RouteComponentProps<{ id: string }>) => {
  const isWideEnough = useMedia("(min-width:768px)");
  const [state, setState] = useState<HomeState>({
    votes: {},
    hidden: {},
  });

  const [queueHide, setQueuHide] = useState<string[]>([]);
  const [queueVote, setQueuVote] = useState<HomeState["votes"]>({});

  const markHidden = (id: string) => {
    setState((state) => ({
      ...state,
      hidden: {
        ...state.hidden,
        [id]: true,
      },
    }));
    setQueuHide([...queueHide, id]);
  };

  const upVote = (id: string) => {
    setState((state) => ({
      ...state,
      votes: {
        ...state.votes,
        [id]: (state.votes[id] || 0) + 1,
      },
    }));
    setQueuVote((state) => ({
      ...state,
      [id]: (state[id] || 0) + 1,
    }));
  };

  const { data } = useSWR<NewsData>(
    `search?tags=story${match.params.id ? `&page=${match.params.id}` : ""}`,
    ListFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    const initializeLocalState = async () => {
      const [votes = {}, hidden = {}] = await Promise.all([
        get<HomeState["votes"]>(IDBKeys.votes),
        get<HomeState["hidden"]>(IDBKeys.hidden),
      ]);
      setState({
        votes,
        hidden,
      });
    };
    initializeLocalState();
  }, []);

  useEffect(() => {
    if (Object.keys(queueVote).length > 0) {
      const timeOut = setTimeout(async () => {
        try {
          const votes = (await get<HomeState["votes"]>(IDBKeys.votes)) || {};
          if (Object.keys(queueVote).length > 0) {
            await set(IDBKeys.votes, {
              ...votes,
              ...queueVote,
            });
          }

          //update state if necessary
        } catch (error) {
          console.error("Local update failed");
          //revert votes if necessary6
        }
      }, 800);
      return () => clearTimeout(timeOut);
    }
  }, [queueVote]);

  useEffect(() => {
    if (queueHide.length > 0) {
      const timeOut = setTimeout(async () => {
        try {
          const hidden = (await get<HomeState["hidden"]>(IDBKeys.hidden)) || {};

          if (queueHide.length > 0) {
            const newHidden = queueHide.reduce(
              (acc, value) => ({
                ...acc,
                [value]: true,
              }),
              {}
            );
            await set(IDBKeys.hidden, {
              ...hidden,
              ...newHidden,
            });
          }
        } catch (error) {
          console.error("Local update failed");
          //revert hidden if necessary
        }
      }, 800);
      return () => clearTimeout(timeOut);
    }
  }, [queueHide]);

  const filteredData = filterNews(state, data);

  const pageInfo = data && {
    currentPage: data.page,
    pages: data?.nbPages,
    perPage: data?.hitsPerPage,
  };

  return (
    <Dashboard
      items={filteredData}
      pageInfo={pageInfo}
      isWide={isWideEnough}
      upVote={upVote}
      hide={markHidden}
    />
  );
};

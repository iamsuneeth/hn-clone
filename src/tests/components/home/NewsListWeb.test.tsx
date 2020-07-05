import React from "react";
import { render } from "@testing-library/react";
import { newsListTestData } from "../../data/newsList";
import { NewsListWeb } from "../../../components/news-list/NewsListWeb";
import { BrowserRouter as Router } from "react-router-dom";

describe("Tests for NewsList component", () => {
  test("should render with web version of news", () => {
    const upVote = jest.fn();
    const hide = jest.fn();

    const { getAllByLabelText, container } = render(
      <Router>
        <NewsListWeb
          items={newsListTestData.hits}
          currentPage={0}
          hasNextPage
          hasPrevPage
          upVote={upVote}
          hide={hide}
        />
      </Router>
    );

    expect(getAllByLabelText("upvote").length).toBeGreaterThan(0);
    expect(container).toMatchSnapshot();
  });
});

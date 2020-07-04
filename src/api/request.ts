import Axios from "axios";

export const Request = Axios.create({
  baseURL: "http://hn.algolia.com/api/v1",
});

export const ListFetcher = async (url: string) => {
  const { data } = await Request.get(`/${url}`);
  return data;
};

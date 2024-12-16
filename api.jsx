import axios from "axios";

const api = axios.create({
  baseURL: "https://my-nc-news-s3ph.onrender.com/api",
});

export function getArticles() {
  return api.get(`/articles`).then(({ data }) => {
    return data;
  });
}

export function getArticle(article_id) {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    return data;
  });
}

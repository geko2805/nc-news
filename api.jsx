import axios from "axios";

const api = axios.create({
  baseURL: "https://my-nc-news-s3ph.onrender.com/api",
});

// export function getArticles() {
//   return api.get(`/articles`).then(({ data }) => {
//     return data.articles;
//   });
// }

export function getArticles(topic, author) {
  console.log(topic, author);

  const query =
    `${topic ? `?topic=${topic}` : ""}` +
    `${author ? (topic ? "&" : "?") + `author=${author}` : ""}`;

  return api.get(`/articles${query}`).then(({ data }) => {
    return data.articles;
  });
}

export function getArticle(article_id) {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
}

export function getComments(article_id) {
  return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
}

export function incVotes(article_id, inc_votes) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data }) => {
      return data.article;
    });
}

export function addComment(article_id, username, body) {
  return api
    .post(`/articles/${article_id}/comments`, { username, body })
    .then(({ data }) => {
      return data.comment;
    });
}

export function deleteComment(comment_id) {
  return api
    .delete(`/comments/${comment_id}`, { comment_id })
    .then(({ data }) => {
      return data.msg;
    });
}

export function getTopics() {
  return api.get(`/topics`).then(({ data }) => {
    return data.topics;
  });
}

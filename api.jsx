import axios from "axios";

const api = axios.create({
  baseURL: "https://my-nc-news-s3ph.onrender.com/api",
});

// export function getArticles() {
//   return api.get(`/articles`).then(({ data }) => {
//     return data.articles;
//   });
// }

export function getArticles(topic, sort_by = "created_at", order = "DESC") {
  const queryParams = new URLSearchParams();
  if (topic) queryParams.append("topic", topic);
  if (sort_by) queryParams.append("sort_by", sort_by);
  if (order) queryParams.append("order", order);

  const query = queryParams.toString() ? `?${queryParams.toString()}` : "";

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

export function getUserByUsername(username) {
  return api.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
}

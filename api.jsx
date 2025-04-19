import axios from "axios";

const api = axios.create({
  baseURL: "https://my-nc-news-s3ph.onrender.com/api",
});

// export function getArticles() {
//   return api.get(`/articles`).then(({ data }) => {
//     return data.articles;
//   });
// }

export function getArticles(
  topic,
  sort_by = "created_at",
  order = "DESC",
  page = 1,
  limit = 12,
  filters = {},
  count_only = false,
  search = null
) {
  const queryParams = new URLSearchParams();
  if (topic) queryParams.append("topic", topic);
  if (sort_by) queryParams.append("sort_by", sort_by);
  if (order) queryParams.append("order", order);
  if (!count_only) {
    // include page & limit only if not count_only
    queryParams.append("page", page);
    queryParams.append("limit", limit);
  }
  //filter params
  if (filters.hide_negative) queryParams.append("hide_negative", "true");
  if (filters.author) queryParams.append("author", filters.author);
  if (filters.date_range) queryParams.append("date_range", filters.date_range);
  if (filters.selected_topics)
    queryParams.append("selected_topics", filters.selected_topics.join(","));

  //append count_only as true to return only the count when count_only is true
  if (count_only) queryParams.append("count_only", "true");

  //search param
  if (search) queryParams.append("search", search);

  const query = queryParams.toString() ? `?${queryParams.toString()}` : "";

  return api.get(`/articles${query}`).then(({ data }) => {
    console.log("getArticles response data:", data); // Debug log

    return data;
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

export function incCommentVotes(comment_id, inc_votes) {
  return api
    .patch(`/comments/${comment_id}`, { inc_votes })
    .then(({ data }) => {
      return data.comment;
    });
}

export function getTopics() {
  return api.get(`/topics`).then(({ data }) => {
    return data.topics;
  });
}

export function addTopic({ slug, description }) {
  return api
    .post("/topics", { slug, description })
    .then(({ data }) => {
      console.log("addTopic response:", data);
      return data.topic;
    })
    .catch((error) => {
      console.error("addTopic error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error;
    });
}

export function getUserByUsername(username) {
  return api.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
}

export function submitArticle(author, title, body, topic, article_img_url) {
  return api
    .post(`/articles`, { author, title, body, topic, article_img_url })
    .then(({ data }) => {
      return data.article;
    });
}

export const deleteArticle = (article_id) => {
  return api.delete(`/articles/${article_id}`).catch((err) => console.log(err));
};

export function updateAvatar(username, avatar_url) {
  return api.patch(`/users/${username}`, { avatar_url }).then(({ data }) => {
    return data.user;
  });
}

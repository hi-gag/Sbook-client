import axiosClient, { axiosTopicClient } from './axiosClient';

export const postSignUp = (signupBody) =>
  axiosClient.post('/user/signup', {
    ...signupBody,
  });

export const postLogin = (loginBody) =>
  axiosClient.post('/user/login', {
    ...loginBody,
  });

export const getBookmarkList = (token) =>
  axiosClient.get('/bookmarks', {
    headers: { Authorization: token },
  });

export const getBookmark = (token, bookmarkId) =>
  axiosClient.get(`/bookmarks/${bookmarkId}`, {
    headers: { Authorization: token },
  });

export const getInsights = (bookmarkId) =>
  axiosTopicClient.get(`/bookmark/${bookmarkId}/recommends`);

export const postBookmarkTopic = (bookmarkId, url) =>
  axiosTopicClient.post(`/bookmark/${bookmarkId}/new`, {
    url,
  });

export const postBookmark = (token, bookmarkId, bookmarkIdBody) =>
  axiosClient.post(
    `/bookmarks/${bookmarkId}`,
    { ...bookmarkIdBody },
    {
      headers: { Authorization: token },
    },
  );

export const postBookmarkLists = (token, bookmarkListsBody) =>
  axiosClient.post(
    `/bookmarks`,
    { ...bookmarkListsBody },
    {
      headers: { Authorization: token },
    },
  );

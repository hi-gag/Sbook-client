import axiosClient from './axiosClient';

export const postSignUp = (signupBody) =>
  axiosClient.post('/user/signup', {
    signupBody,
  });

export const postLogin = (loginBody) =>
  axiosClient.post('/user/login', {
    loginBody,
  });

export const getBookmarkList = (token) =>
  axiosClient.get('bookmarks', {
    headers: { Authorization: token },
  });

export const getBookmark = (token, bookmarkId) =>
  axiosClient.get(`bookmarks/${bookmarkId}`, {
    headers: { Authorization: token },
  });

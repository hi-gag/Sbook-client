import axiosClient from './axiosClient';

export const postSignUp = (signupBody) =>
  axiosClient.post('/user/signup', {
    signupBody,
  });

export const postLogin = (loginBody) =>
  axiosClient.post('/user/login', {
    loginBody,
  });

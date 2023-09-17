import axios from "axios";
import { SET_USER_CREDENTIALS } from "../types";


export const fetchGithubAccessToken = ({code}) => async (dispatch) => {
    axios
      .get("http://ec2-54-237-232-233.compute-1.amazonaws.com:4000/getAccessToken?code=" + code)
      .then((response) => {
        const accessToken = response.data.access_token
        if (accessToken) {
            localStorage.setItem("githubAccessToken", accessToken);
            dispatch({
                type: SET_USER_CREDENTIALS,
                payload: {
                    userName: response.data.name,
                    loginName: response.data.login,
                    email: response.data.email,
                    avatar: response.data.avatar_url,
                    company: response.data.company,
                    bio: response.data.bio,
                    accessToken: response.data.access_token
                }
            })
            return {
                success: true
            }
          }
        })
      .catch((error) => {
          console.error("Error exchanging code for access token:", error);
          return { success: false }
        });
};


export const resetAuthData = () => async (dispatch) => {
          dispatch({
              type: SET_USER_CREDENTIALS,
              payload: {
                  userName: "",
                  loginName: "",
                  email: "",
                  avatar: "",
                  company: "",
                  bio: "",
                  accessToken: ""
              }
          })
};


export const fetchGithubUserData = () => async (dispatch, getState) => {
  const {
    auth: { accessToken },
  } = getState();

  const token = accessToken || localStorage.getItem("githubAccessToken");

  axios
    .get("http://ec2-54-237-232-233.compute-1.amazonaws.com:4000/getUserData", {
      headers: {
        'Authorization': `Bearer ${token}`,
      }})
    .then((response) => {
      dispatch({
        type: SET_USER_CREDENTIALS,
        payload: {
            userName: response.data.name,
            loginName: response.data.login,
            email: response.data.email,
            avatar: response.data.avatar_url,
            company: response.data.company,
            bio: response.data.bio,
            accessToken: token
        }
    })
      return { success: true }
      })
    .catch((error) => {
        console.error("Error fetching user data:", error);
        return { success: false }
      });
};
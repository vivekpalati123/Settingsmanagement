import axios from "axios";

const API_URL = "http://localhost:8080/api/settings";

export const saveSettings = (settings) => {
  return axios.post(API_URL, settings);
};

export const getSettings = () => {
  return axios.get(API_URL);
};
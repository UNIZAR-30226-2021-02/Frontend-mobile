import axios from "axios";

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  
  baseURL: "http://35.246.75.160:443/api/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  APIKit.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setClientMail = (mail) => {
  APIKit.defaults.headers.common["identificador"] = mail;
  APIKit.defaults.headers.common["autor"] = mail;
};

export const setInviteName = (name) => {
  APIKit.defaults.headers.common["idInvitado"] = name;
};

export const setGameId = (name) => {
  APIKit.defaults.headers.common["idPartida"] = name;
};

export default APIKit;

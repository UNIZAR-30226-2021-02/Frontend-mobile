import axios from "axios";

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  //baseURL: "http://80.39.50.206:8082/api/",
  //baseURL: "http://10.0.2.2:8080/api/",
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
  console.log("AAAAA" + name);
  APIKit.defaults.headers.common["idPartida"] = name;
};

export const setVoteName = (name) => {
  APIKit.defaults.headers.common["votado"] = name;
};

export const setMonedas = (monedas) => {
  APIKit.defaults.headers.common["monedas"] = monedas;
};

export const setCompra = (idFoto) => {
  APIKit.defaults.headers.common["idFoto"] = idFoto;
};

export const setEquipado = (idFoto) => {
  APIKit.defaults.headers.common["idFoto"] = idFoto;
};

export default APIKit;

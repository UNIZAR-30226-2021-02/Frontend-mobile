import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiUris from "../constants/apiUris";
import apiStatus from "../constants/apiStatus";

//Pide el token al servidor para el usuario "usr" con contraseña "pswd"
const createToken = async (usr, pswd, mail) => {
  fetch(apiUris.register, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: mail,
      nombre: usr,
      password: pswd,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        catchError(response);
        return null;
      } else {
        console.log("Registrando " + usr + " " + mail);
        return response.json();
      }
    })
    .then(async (responseData) => {
      try {
        if (responseData != null) {
          await AsyncStorage.setItem("apiKey", responseData.token);
          console.log("Sesión inciada correctamente");
        }
      } catch (e) {
        console.log(e);
      }
    })
    .done();
};

//Pide el token al servidor para el usuario "usr" con contraseña "pswd"
const getToken = async (usr, pswd) => {
  try {
    fetch(apiUris.login, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: usr,
        password: pswd,
      }),
    })
      .then((response) => {
        console.log("respuesta " + response.status);
        if (response.status != apiStatus.ok) {
          console.log("No es ok :c");
          return null;
        } else {
          console.log("Iniciando sesión como " + usr);

          return response.json();
        }
      })
      .then(async (responseData) => {
        try {
          await AsyncStorage.setItem("apiKey", responseData.token);
          console.log("Sesión inciada correctamente");
        } catch (e) {
          console.log(e);
        }
      })
      .done("token");
  } catch (error) {
    console.error();
    "error en peticion http: " + error;
  }
};

//comprueba si el usuario tiene una sesión activa
const checkToken = async () => {
  let res = false;
  console.log("comprobamos token");
  try {
    const isLoggedIn = await AsyncStorage.getItem("apiKey");
    if (isLoggedIn !== null) {
      // value previously stored
      console.log("tenemos token");
      res = true;
    } else {
      console.log("no tenemos token");
    }
  } catch (e) {
    console.error("error al comprobar token: " + e);
    // error reading value
  }
  return res;
};

//sale de la sesión
const deleteToken = async () => {
  console.log("Deleting token.");
  try {
    await AsyncStorage.removeItem("apiKey");
  } catch (e) {
    // remove error
  }

  console.log("Done.");
};

export { createToken, getToken, checkToken, deleteToken };

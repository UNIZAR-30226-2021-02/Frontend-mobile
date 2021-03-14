import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiConst from "../constants/apiConst";

//Pide el token al servidor para el usuario "usr" con contraseña "pswd"
const userRegister = async (usr, pswd, mail) => {
  fetch(apiConst.register, {
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
      } else {
        console.log("Registrando " + usr + " " + mail);
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
    .done();
};

//Pide el token al servidor para el usuario "usr" con contraseña "pswd"
const userLogin = async (usr, pswd) => {
  fetch(apiConst.login, {
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
      if (!response.ok) {
        catchError(response);
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
    .done();
};

//Función que permite registrarse
const Register = async (usr, pwd, mail) => {
  userRegister(usr, pwd, mail);
  if (CheckLogged()) {
    return true;
  }
  return false;
};

//Función que permite iniciar sesión
const Login = async (usr, pwd) => {
  userLogin(usr, pwd);
  if (CheckLogged()) {
    return true;
  }
  return false;
};

//comprueba si el usuario tiene una sesión activa
const CheckLogged = async () => {
  try {
    const isLoggedIn = await AsyncStorage.getItem("apiKey");
    if (value !== null) {
      // value previously stored
      return true;
    }
  } catch (e) {
    // error reading value
  }
};

//sale de la sesión
const Logout = () => {
  removeValue = async () => {
    try {
      await AsyncStorage.removeItem("apiKey");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };
};
export { Login, Register, CheckLogged, Logout };

import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiUris from "../constants/apiUris";
import apiStatus from "../constants/apiStatus";

//Pide el token al servidor para el usuario "usr" con contraseña "pswd"
const userRegister = async (usr, pswd, mail) => {
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
const userLogin = async (usr, pswd) => {
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
    .done();
};

//Función que permite registrarse
const Register = async (usr, pwd, mail) => {
  console.log("holaaa");
  userRegister(usr, pwd, mail)
    .then((v) => {
      if (CheckLogged()) {
        return true;
      }
    })
    .catch((reason) => {
      console.log(reason);
      return false;
    });
};

//Función que permite iniciar sesión
const Login = async (usr, pwd) => {
  try {
    console.log("holi");
    userLogin(usr, pwd)
      .then((v) => {
        if (CheckLogged()) {
          console.log("true");
          return true;
        } else {
          return false;
        }
      })
      .catch((reason) => {
        console.log(reason);
        return false;
      });
  } catch (error) {}
  console.log("false");
  return false;
};

//comprueba si el usuario tiene una sesión activa
const CheckLogged = async () => {
  try {
    const isLoggedIn = await AsyncStorage.getItem("apiKey");
    if (value !== null) {
      // value previously stored
      console.log("tenemos token");
      return true;
    } else {
      return false;
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

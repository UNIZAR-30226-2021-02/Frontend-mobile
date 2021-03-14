import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiConst from "../constants/apiConst";

const userInfo = { username: "admin", password: "1234" };

//comprueba que el usuario es válido
const checkUser = (usr, pwd) => {
  console.log("holi");

  console.log(usr);
  //TODO llamada a la api
  /* if (usr === userInfo.username && pwd === userInfo.password) {
    console.log(`debe entrar ${usr} ${userInfo.username}`);
    return true;
  }*/

  console.log("false");
  return false;
};

const userLogin = async () => {
  //const value = 1;
  //if (value == 1) {
  // if validation fails, value will be null
  console.log("hude3ibwh");
  fetch(apiConst.login, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: "pablo",
      password: "1234",
    }),
  })
    .then((response) => {
      console.log(
        "he mandado " +
          JSON.stringify({
            nombre: "pablo",
            password: "1234",
          })
      );

      return response.json();
    })
    .then(async (responseData) => {
      try {
        console.log(responseData);
        await AsyncStorage.setItem("apiKey", responseData.token);
      } catch (e) {
        console.log(e);
      }
    })
    .done();
  // }
};

const getProtectedQuote = async () => {
  var DEMO_TOKEN = await AsyncStorage.getItem("apiKey");
  console.log();
  fetch(apiConst.all, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + DEMO_TOKEN,
    },
  })
    .then((response) => response.text())
    .then((responseData) => {
      console.log(responseData);
    })
    .done();
};

const Login = async (usr, pwd) => {
  userLogin();
  if (CheckLogged()) {
    return true;
  }
  return false;
};

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
export { Login, CheckLogged, Logout, getProtectedQuote };

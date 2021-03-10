import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userInfo = { username: "admin", password: "1234" };

//comprueba que el usuario es válido
const checkUser = (usr, pwd) => {
  //TODO llamada a la api
  if (usr === userInfo.username && pwd === userInfo.password) {
    return true;
  }
  return false;
};

const Login = async (usr, pwd) => {
  if (checkUser(usr, pwd)) {
    try {
      await AsyncStorage.setItem("apiKey", "1");
      alert("Logged in");
      return true;
    } catch (e) {
      alert("error saving data");
      return false;
    }
  } else {
    alert(":c");
  }
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
export { Login, CheckLogged, Logout };

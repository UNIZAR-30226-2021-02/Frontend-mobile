import React from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
import APIKit, { setClientToken, setClientMail } from "../util/APIKit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getProtectedQuote = () => {
  const onSuccess = ({ data }) => {
    console.log(data);
  };

  const onFailure = (error) => {
    console.log(error && error.response);
  };

  APIKit.get("/all").then(onSuccess).catch(onFailure);
};

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="get" onPress={() => getProtectedQuote()} />
      <Button
        title="Sign out"
        onPress={() => {
          setClientToken("");
          AsyncStorage.setItem("@token", "");
          setClientMail("");
          AsyncStorage.setItem("@mail", "");
          navigation.navigate("LoginScreen");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    flex: 1,
  },
});

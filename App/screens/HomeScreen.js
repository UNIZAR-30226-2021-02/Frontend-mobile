import React from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
import APIKit, { setClientToken } from "../util/APIKit";

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

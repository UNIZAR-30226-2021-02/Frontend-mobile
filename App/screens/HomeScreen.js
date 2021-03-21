import React from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
import { deleteToken, getProtectedQuote } from "../util/Login";

//import { Menu } from "../components/NavBar";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="get" onPress={() => getProtectedQuote()} />
      <Button
        title="Sign out"
        onPress={() => {
          deleteToken();
          navigation.navigate("LoginScreen");
        }}
      />
    </SafeAreaView>
  );
};

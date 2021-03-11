import React from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
import { Logout, getProtectedQuote } from "../util/Login";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    flex: 1,
  },
});

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="get" onPress={() => getProtectedQuote()} />
      <Button
        title="Sign out"
        onPress={() => {
          Logout();
          navigation.navigate("LoginScreen");
        }}
      />
    </SafeAreaView>
  );
};

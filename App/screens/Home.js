import React from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";

import HomeScreen from "./Home";
import LoginScreen from "./Login";

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
      <Button
        title="Sign out"
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
      />
    </SafeAreaView>
  );
};

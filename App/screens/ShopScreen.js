import React from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
//import { Menu } from "../components/NavBar";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Shop</Text>
    </SafeAreaView>
  );
};

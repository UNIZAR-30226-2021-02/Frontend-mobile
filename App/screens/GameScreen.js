import React from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
import { GameItem } from "../components/RowItem";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Game</Text>
      <GameItem />
    </SafeAreaView>
  );
};

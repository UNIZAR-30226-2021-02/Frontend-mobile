import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffd",
  },
  text: {
    fontSize: 16,
    color: "#343434",
  },
});

export const RowItem = ({ rightIcon, inText, onPress }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.text}>{inText}</Text>
      {rightIcon}
    </TouchableOpacity>
  );
};

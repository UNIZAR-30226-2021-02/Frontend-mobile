import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";

import colors from "../constants/colors";

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
    width: 470,
  },
  title: {
    color: colors.text,
    fontSize: 16,
  },
  separator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
  },
  picture: { resizeMode: "stretch" },
});

export const RowItem = ({ title, onPress, picture }) => (
  <TouchableOpacity onPress={onPress} style={styles.row}>
    <Image
      source={require("../assets/images/monstruo.png")}
      style={styles.picture}
    />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

export const RowSeparator = () => <View style={styles.separator} />;

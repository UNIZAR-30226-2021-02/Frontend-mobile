import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

export const RankingItem = ({ name, onPress, picture }) => (
  <TouchableOpacity onPress={onPress} style={styles.row}>
    <Image
      source={require("../assets/images/monstruo.png")}
      style={styles.picture}
    />
    <Text style={styles.title}>{name}</Text>
  </TouchableOpacity>
);

export const RequestItem = ({ name, onPress, picture }) => (
  <TouchableOpacity onPress={onPress} style={styles.row}>
    <Image
      source={require("../assets/images/monstruo.png")}
      style={styles.picture}
    />
    <Text style={styles.title}>{name}</Text>
    <AntDesign name="checkcircle" size={24} color="black" />
    <MaterialCommunityIcons name="close-circle" size={24} color="black" />
  </TouchableOpacity>
);

export const RowSeparator = () => <View style={styles.separator} />;

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
  picture: { width: 50, height: 50 },
});

export const RankingItem = ({ name, onPress, ind, picture, pts }) => {
  console.log(picture);
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{ind}</Text>
      <Image
        source={{
          uri: picture,
        }}
        style={styles.picture}
      />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{pts + " pts."}</Text>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name="close-circle" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export const RequestItem = ({ name, onPressAdd, onPressReject, picture }) => (
  <View style={styles.row}>
    <Image
      source={{
        uri: picture,
      }}
      style={styles.picture}
    />
    <Text style={styles.title}>{name}</Text>
    <TouchableOpacity onPress={onPressAdd}>
      <AntDesign name="checkcircle" size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onPressReject}>
      <MaterialCommunityIcons name="close-circle" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

export const RowSeparator = () => <View style={styles.separator} />;

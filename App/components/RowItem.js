import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

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
    borderRadius: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  semirow: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
    width: "80%",
    borderRadius: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  title: {
    color: colors.text,
    fontSize: 16,
  },
  separator: {
    backgroundColor: colors.border,
  
    marginLeft: 20,
    height: 5,
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

export const InviteItem = ({
  nameGame,
  namePlayer,
  onPressAccept,
  onPressReject,
}) => (
  <View style={styles.row}>
    <Text style={styles.title}>
      Game {nameGame} from player {namePlayer}
    </Text>
    <TouchableOpacity onPress={onPressAccept}>
      <AntDesign name="checkcircle" size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onPressReject}>
      <MaterialCommunityIcons name="close-circle" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

export const GameItem = ({ name, onPressPlay }) => (
  <View style={styles.row}>
    <Text style={styles.title}>{name}</Text>
    <TouchableOpacity onPress={onPressPlay}>
      <AntDesign name="play" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

export const InLobbyItem = ({ name, onPress, picture }) => {
  console.log(picture);
  return (
    <View style={styles.semirow}>
      <Image
        source={{
          uri: picture,
        }}
        style={styles.picture}
      />
      <Text style={styles.title}>{name}</Text>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name="close-circle" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export const InviteFriendItem = ({ name, onPress, picture }) => {
  console.log(picture);
  return (
    <View style={styles.semirow}>
      <Image
        source={{
          uri: picture,
        }}
        style={styles.picture}
      />
      <Text style={styles.title}>{name}</Text>
      <TouchableOpacity onPress={onPress}>
        <Octicons name="diff-added" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export const RowSeparator = () => <View style={styles.separator} />;

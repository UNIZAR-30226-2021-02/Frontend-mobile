import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import colors from "../../constants/colors";
import URI from "../../constants/apiUris";

export const PuntuacionItem = ({ name, img, pD, pL, pG }) => {
  return (
    <View style={styles.rowImg}>
      <View style={styles.nombreCara}>
        <Image
          source={{
            uri: URI.img + img,
          }}
          style={styles.picture}
        />
        <Text style={styles.nombre}>{name}</Text>
      </View>
      <FontAwesome name="pencil" size={20} color="black" />
      <Text style={{ left: 1, fontSize: 15, fontWeight: "bold" }}>{pD}</Text>
      <MaterialCommunityIcons
        style={{ left: 4 }}
        name="brain"
        size={20}
        color="black"
      />
      <Text style={{ left: 4, fontSize: 15, fontWeight: "bold" }}>{pL}</Text>
      <Ionicons
        style={{ left: 6 }}
        name="md-happy-outline"
        size={20}
        color="black"
      />
      <Text
        style={{ left: 6, fontSize: 15, fontWeight: "bold", paddingRight: 10 }}
      >
        {pG}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowImg: {
    paddingHorizontal: 10,
    paddingVertical: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
  },
  picture: {
    top: 2,
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  nombreCara: {
    backgroundColor: "white",
    padding: 6,
    right: "4.5%",
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 18,
    bottom: 2,
  },
});

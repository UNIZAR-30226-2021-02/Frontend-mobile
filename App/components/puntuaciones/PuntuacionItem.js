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
      <FontAwesome name="pencil" size={18} color="black" />
      <Text>{pD}</Text>
      <MaterialCommunityIcons name="brain" size={18} color="black" />
      <Text>{pL}</Text>
      <Ionicons name="md-happy-outline" size={18} color="black" />
      <Text>{pG}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowImg: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  picture: {
    top: 2,
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  nombreCara: {
    backgroundColor: "white",
    padding: 8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 18,
    bottom: 2,
  },
});

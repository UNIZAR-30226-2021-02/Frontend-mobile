import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import URI from "../../constants/apiUris";

export const TextHiloItem = ({ name, img, answer }) => {
  return (
    <View style={styles.row}>
      <View style={styles.rowtext}>
        <View>
          <Image
            source={{
              uri: URI.img + img,
            }}
            style={styles.picture}
          />
          <Text style={styles.nombre}>{name}</Text>
        </View>
        <Text style={styles.contenido}>{answer} </Text>
      </View>
    </View>
  );
};

export const ImgHiloItem = ({ name, img, answer }) => {
  console.log(URI.turnImg + answer);

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

      <Image
        source={{
          uri: URI.turnImg + answer,
          //uri:URI.img+ img,
        }}
        style={styles.imgResponse}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 21,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  rowImg: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  rowtext: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingRight: 22,
    paddingVertical: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    height: "77%",
    borderRadius: 10,
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
  imgResponse: {
    height: 200,
    width: 200,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 18,
    bottom: 2,
  },
  contenido: {
    left: 12,
    fontSize: 15,
  },
});

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    alignItems: "flex-start",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#ffd",
  },
  buttonOut: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#ffd",
  },
});

export const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProfileScreen");
        }}
      >
        <Image
          source={require("../assets/images/monstruo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/images/friends.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/images/tienda.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/images/game.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/images/salir.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

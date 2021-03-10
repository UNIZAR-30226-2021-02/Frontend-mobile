import React from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Text,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
  },
  containerDisabled: {
    backgroundColor: "red",
  },
  button: {
    padding: 15,
    borderRightColor: "#ffa",
    borderRightWidth: 2,
  },
  buttonText: {
    fontSize: 15,
    color: "#4f6d7a",
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
  },
});
const isHiden = (hide) => {
  if (hide) {
    return (
      <TouchableOpacity>
        <Text>Changeee</Text>
      </TouchableOpacity>
    );
  }
  return null;
};

export const FieldInput = ({ title, icon, onButtonPress, secure }) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={value} secureTextEntry={secure} />
      isHidden(secure)
    </View>
  );
};

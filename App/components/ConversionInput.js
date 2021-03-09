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

export const ConversionInput = ({ text, value, onButtonPress, ...props }) => {
  const contStyles = [styles.container];
  if (props.editable === false) {
    contStyles.push(styles.containerDisabled);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} value={value} {...props} />
    </View>
  );
};

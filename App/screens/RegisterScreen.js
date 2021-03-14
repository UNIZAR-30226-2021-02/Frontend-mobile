import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Switch,
  ViewPropTypes,
  View,
} from "react-native";

const screen = Dimensions.get("window");
const state = { text: "Ususario" };

const DiffPWD = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <View {...this.props} style={style}>
      {children}
    </View>
  );
};

export default ({ navigation }) => {
  const [mail, setTextM] = useState("");
  const [username, setTextU] = useState("");
  const [passwordA, setTextPA] = useState("");
  const [passwordB, setTextPB] = useState("");
  const [isHidden, setHide] = useState("");
  return (
    <SafeAreaView style={styles.backgrdContainer}>
      <ScrollView style={{ flex: 1, alignContent: "center" }}>
        <TextInput placeholder="Mail" onChangeText={(mail) => setTextM(mail)} />
        <TextInput
          placeholder="Username"
          onChangeText={(username) => setTextU(username)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(passwordA) => {
            setTextPA(passwordA);
            if (passwordA === passwordB) {
              setHide(true);
            } else {
              setHide(false);
            }
          }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Repeat Password"
          onChangeText={(passwordB) => {
            setTextPB(passwordB);
            if (passwordB === passwordA) {
              setHide(true);
            } else {
              setHide(false);
            }
          }}
        />
        <DiffPWD
          hide={isHidden}
          onValueChange={(value) => this.setState({ isHidden: value })}
        >
          <Text>Nooo son diferentessss</Text>
        </DiffPWD>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(mail);
            console.log(username);
            console.log(passwordA);
            console.log(passwordB);
            navigation.navigate("LoginScreen");
          }}
        >
          <Text style={styles.text}>Go to login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgrdContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "yellow",
    flex: 1,
  },
  input: {},
  button: {},
  text: {},
});

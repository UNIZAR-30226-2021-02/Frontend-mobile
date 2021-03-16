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
  const [isnotHidden, setShow] = useState(true);
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
              setShow(true);
            } else {
              setShow(false);
            }
          }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Repeat Password"
          onChangeText={(passwordB) => {
            setTextPB(passwordB);
            if (passwordB === passwordA) {
              setShow(true);
            } else {
              setShow(false);
            }
          }}
        />
        <DiffPWD
          hide={isnotHidden}
          onValueChange={(value) => this.setState({ isnotHidden: value })}
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
            Register(username, passwordA, mail).then((v) => {
              console.log(v);
              if (v) {
                navigation.navigate("HomeScreen");
              }
            });
          }}
        >
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
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

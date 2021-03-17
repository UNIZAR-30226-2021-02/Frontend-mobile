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

import APIKit, { setClientToken } from "../util/APIKit";

const initialState = {
  mail: "",
  username: "",
  passwordA: "",
  passwordB: "",
  errors: {},
  isAuthorized: false,
  isLoading: false,
  isnotHidden: false,
};

const DiffPWD = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return <View style={style}>{children}</View>;
};

class Register extends Component {
  state = initialState;

  componentWillUnmount() {}

  onMailChange = (mail) => {
    this.setState({ mail });
    console.log("Son: " + state.mail);
  };

  onUsernameChange = (username) => {
    this.setState({ username });
  };

  onPasswordAChange = (passwordA) => {
    this.setState({ passwordA });
    console.log("Son: " + state.passwordA + "  " + state.passwordB);
    if (state.passwordA === state.passwordB) {
      this.setShow(false);
    } else {
      this.setShow(true);
    }
  };

  onPasswordBChange = (passwordB) => {
    this.setState({ passwordB });
    console.log("Son: " + state.passwordA + "  " + state.passwordB);
    if (state.passwordB === state.passwordA) {
      this.setShow(false);
    } else {
      this.setShow(true);
    }
  };

  setShow = (value) => {
    state.isnotHidden = value;
    console.log("Se cambia a " + value);
  };

  onPressRegister() {
    const { username, passwordA, mail } = this.state;
    const payload = JSON.stringify({
      nombre: username,
      password: passwordA,
      mail: mail,
    });
    console.log(payload);

    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      setClientToken(data.token);
      this.setState({ isLoading: false, isAuthorized: true });
      this.props.navigation.navigate("HomeScreen");
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };

    // Show spinner when call is made
    this.setState({ isLoading: true });

    APIKit.post("/register", payload).then(onSuccess).catch(onFailure);
  }

  render() {
    return (
      <SafeAreaView style={styles.backgrdContainer}>
        <ScrollView style={{ flex: 1, alignContent: "center" }}>
          <TextInput placeholder="Mail" onChangeText={this.onMailChange} />
          <TextInput
            placeholder="Username"
            onChangeText={this.onUsernameChange}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={this.onPasswordAChange}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Repeat Password"
            onChangeText={this.onPasswordBChange}
          />
          <DiffPWD
            hide={state.isnotHidden}
            onValueChange={(value) => this.setShow(value)}
          >
            <Text>Nooo son diferentessss</Text>
          </DiffPWD>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPressRegister.bind(this)}
          >
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("LoginScreen");
            }}
          >
            <Text style={styles.text}>Go to login</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

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

export default Register;

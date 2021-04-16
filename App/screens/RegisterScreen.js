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
  Image,
  Alert,
} from "react-native";
import URI from "../constants/apiUris";

const screen = Dimensions.get("window");
const state = { text: "Ususario" };

import APIKit, { setClientToken, setClientName } from "../util/APIKit";
import Colors from "../constants/colors";

const initialState = {
  mail: "",
  username: "",
  passwordA: "",
  passwordB: "",
  errors: {},
  isAuthorized: false,
  isLoading: false,
  hide: true,
};

const DiffPWD = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  if (hide == null) {
    return null;
  }
  return <View style={style}>{children}</View>;
};

class Register extends Component {
  state = initialState;

  componentWillUnmount() {}

  onMailChange = (mail) => {
    this.setState({ mail });
    console.log("Son: " + this.state.mail);
  };

  onUsernameChange = (username) => {
    this.setState({ username });
  };

  onPasswordAChange = (passwordA) => {
    this.state.passwordA = passwordA;
    console.log("Son: " + this.state.passwordA + "  " + this.state.passwordB);
    if (this.state.passwordA === this.state.passwordB) {
      this.setState({ hide: true });
    } else {
      this.setState({ hide: false });
    }
  };

  onPasswordBChange = (passwordB) => {
    this.state.passwordB = passwordB;
    console.log("Son: " + this.state.passwordA + "  " + this.state.passwordB);
    if (this.state.passwordB === this.state.passwordA) {
      this.setState({ hide: true });
    } else {
      this.setState({ hide: false });
    }
  };

  setShow = (value) => {
    this.state.hide = value;
    console.log("Se cambia a " + value);
  };

  onPressRegister() {
    if (
      this.state.mail != "" &&
      this.state.passwordA != "" &&
      this.state.username != "" &&
      this.state.passwordA == this.state.passwordB &&
      this.state.mail.includes("@") &&
      this.state.mail.includes(".")
    ) {
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
        setClientName(this.state.username);
        this.setState({ isLoading: false, isAuthorized: true });
        this.props.navigation.navigate("Home");
      };

      const onFailure = (error) => {
        console.log(error && error.response);
        if (error.message == "Request failed with status code 417") {
          Alert.alert("El usuario o el mail introducidos ya están en uso.");
        }
        this.setState({ errors: error.response.data, isLoading: false });
      };

      // Show spinner when call is made
      this.setState({ isLoading: true });

      APIKit.post(URI.register, payload).then(onSuccess).catch(onFailure);
    } else if (this.state.passwordA != this.state.passwordB) {
      Alert.alert("Las contraseñas no coinciden, inténtelo de nuevo.");
    } else {
      Alert.alert("Rellene todos los campos, por favor.");
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.backgrdContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/background.png")}
            style={styles.logoBackground}
          />
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Mail"
          onChangeText={this.onMailChange}
        />
        <View style={styles.separator} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={this.onUsernameChange}
        />
        <View style={styles.separator} />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={this.onPasswordAChange}
        />
        <View style={styles.separator} />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Repeat Password"
          onChangeText={this.onPasswordBChange}
        />
        <View style={styles.separator} />
        <DiffPWD
          hide={this.state.hide}
          onValueChange={(value) => this.setShow(value)}
        >
          <Text style={{ color: "red" }}>
            Las contraseñas introducidas son diferentes
          </Text>
        </DiffPWD>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressRegister.bind(this)}
        >
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.goLogin}
          onPress={() => {
            this.props.navigation.navigate("LoginScreen");
          }}
        >
          <Text style={styles.textGO}>Go to login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backgrdContainer: {
    alignItems: "center",
    backgroundColor: Colors.background,
    flex: 1,
  },
  input: {
    color: Colors.grey,
    backgroundColor: Colors.white,
    width: "50%",
    paddingLeft: 8,
    borderRadius: 9,
  },
  button: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.cyan,
    height: "10%",
    width: "25%",
    shadowColor: Colors.cyan,
    shadowOffset: {
      width: 10,
      height: 8,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.27,
    elevation: 7,
  },
  text: {
    color: Colors.white,
    fontWeight: "bold",
  },
  textGO: {
    color: Colors.white,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  logoContainer: {
    paddingTop: screen.height * 0.42,
    alignItems: "center",
    justifyContent: "center",
  },
  logoBackground: {
    position: "absolute",
    width: screen.width * 0.18,
    height: screen.width * 0.19,
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.13,
    height: screen.width * 0.14,
  },
  separator: {
    height: "1.5%",
  },
  goLogin: {
    height: "5%",
    width: "12%",
  },
});

export default Register;

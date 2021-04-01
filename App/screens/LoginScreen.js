import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import Colors from "../constants/colors";
const screen = Dimensions.get("window");

import APIKit, { setClientToken, setClientName } from "../util/APIKit";

const initialState = {
  username: "",
  password: "",
  errors: {},
  isAuthorized: false,
  isLoading: false,
};

class Login extends Component {
  state = initialState;

  componentWillUnmount() {}

  onUsernameChange = (username) => {
    this.setState({ username });
  };

  onPasswordChange = (password) => {
    this.setState({ password });
  };

  onPressLogin() {
    const { username, password } = this.state;
    const payload = JSON.stringify({ nombre: username, password: password });
    console.log(payload);

    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      setClientToken(data.token);
      setClientName(this.state.username);
      this.setState({ isLoading: false, isAuthorized: true });
      this.props.navigation.navigate("Home");
    };

    const onFailure = (error) => {
      console.log("Petición fallida ");

      this.setState({ isLoading: false });
      Alert.alert("No se puede conectar al servidor, pruebe más tarde");
    };

    // Show spinner when call is made
    this.setState({ isLoading: true });

    APIKit.post("/login", payload).then(onSuccess).catch(onFailure);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <SafeAreaView style={styles.backgrdContainer}>
        <Spinner visible={isLoading} />
        <View style={styles.container}>
          <Text style={styles.textH1}>Username</Text>
          <TextInput
            style={styles.input}
            value={this.state.username}
            maxLength={256}
            placeholder="Enter username..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onChangeText={this.onUsernameChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.textH1}>Password</Text>
          <TextInput
            ref={(node) => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.password}
            maxLength={40}
            placeholder="Enter password..."
            onChangeText={this.onPasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            blurOnSubmit
            secureTextEntry
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPressLogin.bind(this)}
          >
            <Text style={styles.textButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={styles.textButton}>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

// Estilos
const styles = StyleSheet.create({
  backgrdContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.background,
    flex: 1,
  },
  container: {
    width: screen.width * 0.75,
    height: screen.height * 0.15,
  },
  button: {
    position: "absolute",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    top: 10,
    backgroundColor: Colors.white,
    height: 40,
    width: 200,
  },
  textH1: {
    top: 10,
    color: Colors.white,
    fontSize: 20,
    paddingVertical: 16,
  },
  textH2: {
    top: -130,
    color: Colors.tranparentwhite,
    fontSize: 14,
    paddingVertical: 16,
  },
  input: {
    color: Colors.grey,
    backgroundColor: Colors.white,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Login;

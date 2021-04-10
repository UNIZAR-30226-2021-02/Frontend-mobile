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
  Image,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import Colors from "../constants/colors";
import URI from "../constants/apiUris";
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

    APIKit.post(URI.login, payload).then(onSuccess).catch(onFailure);
  }

  render() {
    const { isLoading } = this.state;

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
        <View style={styles.separator} />
        <Spinner visible={isLoading} />
        <TextInput
          style={styles.input}
          value={this.state.username}
          maxLength={256}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onChangeText={this.onUsernameChange}
          underlineColorAndroid="transparent"
          placeholderTextColor="#999"
        />
        <View style={styles.separator} />
        <TextInput
          ref={(node) => {
            this.passwordInput = node;
          }}
          style={styles.input}
          value={this.state.password}
          maxLength={40}
          placeholder="Password"
          onChangeText={this.onPasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          blurOnSubmit
          secureTextEntry
          underlineColorAndroid="transparent"
          placeholderTextColor="#999"
        />
        <View style={styles.separatorBig} />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressLogin.bind(this)}
        >
          <Text style={styles.textButton}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.separatorBig} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("RegisterScreen");
          }}
        >
          <Text style={styles.textButton}>Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

// Estilos
const styles = StyleSheet.create({
  backgrdContainer: {
    alignItems: "center",
    backgroundColor: Colors.background,
    flex: 1,
  },
  container: {
    width: screen.width * 0.75,
    height: screen.height * 0.2,
  },
  logoContainer: {
    paddingTop: screen.height * 0.45,
    alignItems: "center",
    justifyContent: "center",
  },
  logoBackground: {
    position: "absolute",
    width: screen.width * 0.2,
    height: screen.width * 0.21,
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.15,
    height: screen.width * 0.16,
  },
  button: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.cyan,
    height: "10%",
    width: "25%",
  },
  input: {
    color: Colors.grey,
    backgroundColor: Colors.white,
    width: "50%",
    paddingLeft: 8,
    borderRadius: 9,
  },
  separator: {
    height: "1.5%",
  },
  separatorBig: {
    height: "4%",
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textButton: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default Login;

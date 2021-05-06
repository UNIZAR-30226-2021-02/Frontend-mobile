import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Colors from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URI from "../../constants/apiUris";
import APIKit from "../../util/APIKit";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: Colors.background,
    width: "43%",
    height: "82%",
    right: "9%",
  },
  button: {
    top: "7%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.cyan,
    height: "13%",
    width: "22%",
  },
  textButton: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "bold",
  },
  textSay: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "bold",
  },
  input: {
    top: "3%",
    width: "80%",
    color: Colors.grey,
    backgroundColor: Colors.white,
    paddingLeft: 8,
    borderRadius: 9,
  },
});

const initState = { respuestaAct: "" };
class Write extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  onAnswerChange = (respuestaAct) => {
    this.setState({ respuestaAct });
  };

  onPressSend() {
    const { respuestaAct } = this.state;
    const payload = JSON.stringify({ contenido: respuestaAct });
    console.log(payload);
    const onSuccess = ({ data }) => {
      console.log("OK :" + data);
      this.setState({ isLoading: false, isAuthorized: true });
    };

    const onFailure = (error) => {
      console.log(error.message);
      if (error.message == "Request failed with status code 417") {
        Alert.alert(
          "El jugador no pertenece a la partida o ya ha jugado ese turno."
        );
      }
      this.setState({ isLoading: false });
      //Alert.alert("No se puede conectar al servidor, pruebe más tarde ");
    };

    // Show spinner when call is made
    this.setState({ isLoading: true });

    APIKit.post(URI.sendText, payload).then(onSuccess).catch(onFailure);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textSay}>¿Qué ves en el dibujo?</Text>
        <TextInput
          style={styles.input}
          value={this.state.respuestaAct}
          onChangeText={this.onAnswerChange}
          placeholder="Peepo"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressSend.bind(this)}
        >
          <Text style={styles.textButton}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Write;

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
} from "react-native";
import Colors from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URI from "../../constants/apiUris";
import APIKit from "../../util/APIKit";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: Colors.background,
    width: "75%",
    height: "100%",
  },
  button: {
    backgroundColor: "blue",
  },
  input: {
    top: "23%",
    width: "70%",
    color: Colors.grey,
    backgroundColor: Colors.white,
    paddingLeft: 8,
    borderRadius: 9,
  },
  button: {
    top: "27%",
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
    top: "20%",
    fontSize: 16,
    color: Colors.white,
    fontWeight: "bold",
  },
});

const initState = { respuestaAct: "" };
class IniWrite extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  onAnswerChange = (respuestaAct) => {
    this.setState({ respuestaAct });
  };

  onPressSend() {
    const { respuestaAct } = this.state;
    const payload = respuestaAct;
    console.log(payload);
    const onSuccess = ({ data }) => {
      console.log("OK :" + data);
      ToastAndroid.show("Enviado: " + respuestaAct, ToastAndroid.SHORT);
      this.props.reload();
      this.setState({ isLoading: false, isAuthorized: true });
    };

    const onFailure = (error) => {
      console.log(error.message);
      if (error.message == "Request failed with status code 417") {
        Alert.alert(
          "El jugador no pertenece a la partida o ya ha jugado ese turno."
        );
      } else if (error.message == "Request failed with status code 400") {
        ToastAndroid.show(
          "No se puede enviar una respuesta vacía",
          ToastAndroid.SHORT
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
        <Text style={styles.textSay}>
          Dinos qué quieres que dibujen tus amigos.
        </Text>
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

export default IniWrite;

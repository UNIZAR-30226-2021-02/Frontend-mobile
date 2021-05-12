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

const initState = { respuestaAct: "" };
class Wait extends Component {
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

    APIKit.post(URI.addRespuesta, payload).then(onSuccess).catch(onFailure);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>
          Esperando a que los demás jugadores acaben...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  texto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    bottom: "19%",
  },
});

export default Wait;

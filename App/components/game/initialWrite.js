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
    backgroundColor: "red",
    width: "75%",
    height: "100%",
  },
  button: {
    backgroundColor: "blue",
  },
  input: {
    width: "50%",
    color: Colors.grey,
    backgroundColor: Colors.white,
    paddingLeft: 8,
    borderRadius: 9,
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
        <Text>Dinos qué quieres que dibujen tus amigos.</Text>
        <TextInput
          style={styles.input}
          value={this.state.respuestaAct}
          onChangeText={this.onAnswerChange}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressSend.bind(this)}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default IniWrite;

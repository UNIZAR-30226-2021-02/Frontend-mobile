import React, { Component } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  Alert,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import APIKit from "../util/APIKit";
import URI from "../constants/apiUris";
import ListaInLobby from "../components/ListaInLobby";
import ListaInLobbyAdd from "../components/ListaInLobbyAdd";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/colors";

const initState = { partida: "", isLoading: false };

class Lobby extends Component {
  constructor() {
    super();
    this.state = initState;
    AsyncStorage.getItem("@partidaName", (err, item) => {
      this.setState({ partida: item });
      console.log("Soy " + this.state.partida);
    });
  }

  onPressStart() {
    const onSuccess = ({ data }) => {
      console.log("Enviado manin " + data);
      this.setState({ isLoading: false });
      this.props.navigation.navigate("Turn");
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      if (error.message == "Request failed with status code 417") {
        Alert.alert("Sólo el host puede iniciar la partida.");
      } else if (error.message == "Request failed with status code 503") {
        Alert.alert("La partida ya está empezada.");
      } else if (error.message == "Request failed with status code 423") {
        Alert.alert(
          "No se puede empezar una partida con menos de 3 jugadores."
        );
      } else {
        Alert.alert("Error desconocido.");
      }
    };

    APIKit.get(URI.startGame).then(onSuccess).catch(onFailure);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.upLeftContainer}>
            <TouchableOpacity
              style={styles.return}
              onPress={() => this.props.navigation.navigate("Game")}
            >
              <Fontisto name="arrow-return-left" size={26} color="white" />
            </TouchableOpacity>
            <Text style={styles.lobbyText}>
              Lobby from: {"\n"} {this.state.partida}
            </Text>
          </View>
          <ListaInLobby />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.friendsContainer}>
            <ListaInLobbyAdd />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPressStart.bind(this)}
          >
            <Text style={styles.textButton}>Start</Text>
            <Text style={styles.textButton}>Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    paddingLeft: "5%",
    paddingTop: "3%",
    flexDirection: "column",
    width: "50%",
    backgroundColor: Colors.background,
  },
  upLeftContainer: {
    flexDirection: "row",
    paddingBottom: "5%",
  },
  rightContainer: {
    paddingLeft: "5%",
    paddingTop: "3%",
    flexDirection: "column",
    width: "50%",
    borderLeftWidth: 2,
    borderLeftColor: "cyan",
  },
  lobbyText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    left: "30%",
  },
  return: {
    right: "30%",
  },
  createContainer: {
    top: "10%",
    flexDirection: "row",
  },
  listaPartidas: {
    top: "20%",
  },
  toggle: {
    top: "5%",
    flexDirection: "row",
  },
  friendsContainer: {
    left: "6.5%",
    height: "80%",
  },
  button: {
    left: "36%",
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
  separator: {
    height: "1.5%",
  },
});

export default Lobby;

import React, { Component } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import ListaInLobby from "../components/ListaInLobby";
import ListaInLobbyAdd from "../components/ListaInLobbyAdd";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/colors";

const initState = { partida: "" };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    paddingLeft: "5%",
    paddingTop: "3%",
    flexDirection: "column",
    width: "50%",
    backgroundColor: "cyan",
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
  },
  lobbyText: {
    fontSize: 20,
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
});
class Lobby extends Component {
  constructor() {
    super();
    this.state = initState;
    AsyncStorage.getItem("@partidaName", (err, item) => {
      this.setState({ partida: item });
      console.log("Soy " + this.state.partida);
    });
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
              <Fontisto name="arrow-return-left" size={26} color="black" />
            </TouchableOpacity>
            <Text style={styles.lobbyText}>
              Lobby from: {this.state.partida}
            </Text>
          </View>
          <ListaInLobby />
        </View>
        <View style={styles.rightContainer}>
          <ListaInLobbyAdd />
        </View>
      </View>
    );
  }
}

export default Lobby;

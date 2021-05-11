import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5, AntDesign, Fontisto } from "@expo/vector-icons";
import APIKit, { setClientToken, setClientMail } from "../util/APIKit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Hilo from "../components/hilos/Hilo";
import URI from "../constants/apiUris";
import Votacion from "../components/votaciones/votacion";
import Colors from "../constants/colors";

class ScoreScreen extends Component {
  constructor() {
    super();
    this.numHilo = 0;
    this.hilos = [];
    AsyncStorage.getItem("@partidaName", (err, item) => {
      this.setState({ partida: item });
      console.log("Soy " + this.state.partida);
    });
    this.state = { acabado: false, estrellas: 0, monedas: 0 };
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const onSuccess = ({ data }) => {
      console.log(data);
      console.log(data.length);
      this.setState({ acabado: true });
      this.recompensas();
    };

    const onFailure = (error) => {
      console.log("Ha fallado (puntuaciones)");
      console.log(error);
    };

    APIKit.get(URI.verResultados).then(onSuccess).catch(onFailure);
  };

  recompensas = async () => {
    const onSuccess = ({ data }) => {
      console.log(data);
      //TODO
      this.setState({ estrellas: data.estrellas, monedas: data.monedas });
    };

    const onFailure = (error) => {
      console.log("Ha fallado (mi recompensa)");
      console.log(error);
    };

    APIKit.get(URI.verPuntuacion).then(onSuccess).catch(onFailure);
  };

  renderWait() {
    return (
      <View style={{ top: "20%" }}>
        <Text style={styles.lobbyText}>
          Espera a que los demás jugadores voten
        </Text>
      </View>
    );
  }

  renderFin() {
    return (
      <View style={styles.containerLR}>
        <View>
          <View>
            <FontAwesome5 name="coins" size={18} color="white" />
            <Text>{this.state.monedas}</Text>
          </View>
          <View>
            <AntDesign name="staro" size={23} color="white" />
            <Text>{this.state.estrellas}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upLeftContainer}>
          <TouchableOpacity
            style={styles.return}
            onPress={() => this.props.navigation.navigate("Game")}
          >
            <Fontisto name="arrow-return-left" size={26} color="white" />
          </TouchableOpacity>
          <Text style={styles.lobbyText}>
            Turn from:{"\n"} {this.state.partida}
          </Text>
        </View>
        {this.state.acabado ? this.renderWait() : this.renderFin()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: "column",
  },
  upLeftContainer: {
    paddingLeft: "5%",
    paddingTop: "3%",
    flexDirection: "row",
    paddingBottom: "5%",
  },
  lobbyText: {
    fontSize: 20,
    fontWeight: "bold",
    left: "30%",
    color: "white",
  },
  containerLR: {
    flex: 1,
    flexDirection: "row",
  },
});

export default ScoreScreen;

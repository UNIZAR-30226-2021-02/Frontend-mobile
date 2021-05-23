import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from "react-native";
import {
  FontAwesome5,
  AntDesign,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import APIKit, { setClientToken, setClientMail } from "../util/APIKit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Hilo from "../components/hilos/Hilo";
import URI from "../constants/apiUris";
import Votacion from "../components/votaciones/votacion";
import Colors from "../constants/colors";
import Puntuaciones from "../components/puntuaciones/Puntuaciones";
const screen = Dimensions.get("window");

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
      console.log(data[0]);
      this.setState({ estrellas: data[0], monedas: data[1] });
    };

    const onFailure = (error) => {
      console.log("Ha fallado (mi recompensa)");
      console.log(error);
    };

    APIKit.get(URI.verPuntuacion).then(onSuccess).catch(onFailure);
  };

  renderWait() {
    return (
      <View
        style={{
          top: "15%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.waitText}>
          Espera a que los demás jugadores voten
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.loadData();
            ToastAndroid.show(" Refrescando... ", ToastAndroid.SHORT);
          }}
        >
          <Ionicons
            name="refresh-circle-outline"
            size={60}
            color={Colors.cyan}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderFin() {
    return (
      <View style={styles.containerLR}>
        <Puntuaciones />
        <View style={{ left: screen.width * 0.3 }}>
          <View style={styles.containerAcabada}>
            <Text style={styles.textAcabada}>Partida acabada</Text>
          </View>
          <View style={{ flexDirection: "row", left: "4%", top: "15%" }}>
            <FontAwesome5
              style={{ paddingRight: 4 }}
              name="coins"
              size={30}
              color="white"
            />
            <Text style={styles.rewardText}>{this.state.monedas}</Text>
          </View>
          <View style={{ flexDirection: "row", left: "4%", top: "17%" }}>
            <AntDesign name="staro" size={33} color="white" />
            <Text style={styles.rewardText}>{this.state.estrellas}</Text>
          </View>
          <Text
            style={{
              bottom: "38%",
              alignSelf: "center",
              right: "32%",
              color: "white",
              fontSize: 15,
            }}
          >
            Recibirás las siguientes recompensas {"\n\t\t\t"}cuando todos los
            jugadores {"\n\t\t "} hayan llegado a esta pantalla:
          </Text>
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
        {this.state.acabado ? this.renderFin() : this.renderWait()}
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
    fontSize: 19,
    fontWeight: "bold",
    left: "30%",
    color: "white",
  },
  waitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  rewardText: {
    fontSize: 22,
    fontWeight: "bold",
    left: "30%",
    color: "white",
  },
  containerLR: {
    flex: 1,
    flexDirection: "row",
    left: "8%",
  },
  button: {
    top: "10%",
  },
  containerAcabada: {
    bottom: "25%",
    backgroundColor: "grey",
    right: "27%",
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
  },
  textAcabada: {
    paddingVertical: "4%",
    paddingHorizontal: "4%",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});

export default ScoreScreen;

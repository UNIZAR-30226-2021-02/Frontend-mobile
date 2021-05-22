import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import APIKit, { setClientToken, setClientMail } from "../util/APIKit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Hilo from "../components/hilos/Hilo";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import URI from "../constants/apiUris";
import Votacion from "../components/votaciones/votacion";
import Colors from "../constants/colors";

class HilosScreen extends Component {
  constructor() {
    super();
    this.numHilo = 0;
    this.hilos = [];
    AsyncStorage.getItem("@partidaName", (err, item) => {
      this.setState({ partida: item });
      console.log("Soy " + this.state.partida);
    });

    this.state = {
      hiloAhora: [],
      righBtn: "Siguiente hilo",
      hilos: true,
      iniAct: "",
    };
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const onSuccess = ({ data }) => {
      console.log(data);
      console.log(data.length);
      this.hilos = data;
      this.setState({ hiloAhora: this.hilos[0] });
      this.setState({ iniAct: this.state.hiloAhora.jugadorInicial_.nombre });
      console.log("iniAct " + this.state.iniAct);
    };

    const onFailure = (error) => {
      console.log("Ha falladooooooooo");

      console.log(error);
    };

    APIKit.get(URI.getHilos).then(onSuccess).catch(onFailure);
  };

  anteriorHilo() {
    if (this.numHilo > 0) {
      this.setState({ righBtn: "Siguiente hilo" });
      this.numHilo--;
      const hiloAnt = this.hilos[this.numHilo];
      this.setState({ iniAct: hiloAnt.jugadorInicial_.nombre });
      this.setState({ hiloAhora: hiloAnt });

      console.log("Pasamos al hilo " + this.numHilo);
    }
  }

  siguienteHilo() {
    if (this.numHilo < this.hilos.length - 1) {
      this.numHilo++;
      const hiloSig = this.hilos[this.numHilo];
      this.setState({ iniAct: hiloSig.jugadorInicial_.nombre });
      this.setState({ hiloAhora: hiloSig });
      console.log("Pasamos al hilo " + this.numHilo);
      //si es el ultimo hilo cambiamos mensaje
      if (this.numHilo === this.hilos.length - 1) {
        this.setState({ righBtn: "Ir a votar" });
      }
    } else if (this.numHilo === this.hilos.length - 1) {
      this.setState({ hilos: false });
    }
  }
  renderHilo() {
    return (
      <View style={styles.gamezone}>
        <View style={styles.hilos}>
          <View
            style={{
              top: "45%",
              position: "absolute",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={styles.buttonleft}
              title={"Anterior hilo"}
              onPress={() => this.anteriorHilo()}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
              <Text style={styles.textButton}>
                Anterior{"\n"}
                {"\t"} Hilo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonright}
              onPress={() => this.siguienteHilo()}
            >
              {this.state.righBtn == "Siguiente hilo" ? (
                <Text style={styles.textButtonR}> Siguiente{"\n\t\t"}Hilo</Text>
              ) : (
                <Text style={styles.textButtonR}>{this.state.righBtn}</Text>
              )}
              <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Hilo
            hilo={this.state.hiloAhora.respuestas_}
            jugadorInicial={this.state.iniAct}
          />
        </View>
      </View>
    );
  }

  renderVotacion() {
    return (
      <View style={styles.votezone}>
        <Votacion terminar={() => this.props.navigation.navigate("Score")} />
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
        {this.state.hilos ? this.renderHilo() : this.renderVotacion()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hilos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    flex: 1,
  },
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
  gamezone: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "baseline",
    left: "14%",
  },
  votezone: {
    height: 500,
    width: 800,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonleft: {
    bottom: "2%",
    right: "20%",
    flexDirection: "row",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.cyan,
    height: "62%",
    width: "13%",
  },
  buttonright: {
    right: "29%",
    flexDirection: "row",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.cyan,
    height: "60%",
    width: "14.5%",
  },
  textButton: {
    paddingRight: "8%",
    fontSize: 14,
    color: Colors.white,
    fontWeight: "bold",
  },
  textButtonR: {
    paddingLeft: "5%",
    fontSize: 14,
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default HilosScreen;

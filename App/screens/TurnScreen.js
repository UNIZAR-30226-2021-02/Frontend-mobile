import React, { Component } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  ActivityIndicator,
  Dimensions,
  Image,
  ToastAndroid,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/colors";
import Draw from "../components/game/draw";
import Write from "../components/game/write";
import IniWrite from "../components/game/initialWrite";
import APIKit from "../util/APIKit";
import URI from "../constants/apiUris";
import Wait from "../components/game/wait";

const screen = Dimensions.get("window");

const initState = {
  partida: "",
  mode: 1,
  isLoading: true,
  queDibujo: "",
  imagen: "",
};

class TurnScreen extends Component {
  constructor() {
    super();
    this.state = initState;
    AsyncStorage.getItem("@partidaName", (err, item) => {
      this.state.partida = item;
      console.log("Partida: " + this.state.partida);
    });
  }

  checkTurn() {
    const onSuccess = ({ data }) => {
      console.log("Recibo turno" + JSON.stringify(data));
      //seleccionar componente a mostrar
      if (data.id_ == -1) {
        //Primer turno
        console.log("Primer turno");
        this.setState({ mode: 0 });
      } else if (data.id_ == -2) {
        //Esperar siguiente turno
        console.log("esperar siguiente turno");
        this.setState({ mode: 1 });
      } else if (data.id_ == -3) {
        //Esperar siguiente turno
        console.log("partida acabada");
        this.setState({ mode: 4 });
      } else if (data.id_ == -4) {
        //Esperar siguiente turno
        console.log("votaciones acabadas");
        this.setState({ mode: 5 });
      } else {
        console.log("es dibujo " + data.esDibujo);
        if (data.esDibujo) {
          this.setState({ imagen: URI.turnImg + data.id_, mode: 2 });
          //turno escribir
          console.log("laFotoWO: " + this.state.imagen);
          console.log("turno escribir");
        } else {
          this.setState({ mode: 3 });
          //turno dibujar
          this.setState({ queDibujo: data.frase });
          console.log("turno dibujar");
        }
        this.setState({ isLoading: false });
      }
    };

    const onFailure = (error) => {
      console.log("Ha fallado");
      this.setState({ isLoading: false });
      this.props.navigation.navigate("Home");
      ToastAndroid.show("No se pudo encontrar la partida", ToastAndroid.SHORT);
      // console.log(error && error.response);
    };

    this.setState({ isLoading: true });

    APIKit.get(URI.getTurn).then(onSuccess).catch(onFailure);
  }

  componentDidMount() {
    // comprobar turno
    this.checkTurn();
  }

  renderLoading() {
    return <ActivityIndicator size="large" color={Colors.white} />;
  }

  renderMode() {
    console.log(this.state.mode);
    switch (this.state.mode) {
      case 0:
        return <IniWrite reload={() => this.checkTurn()} />;
        break;
      case 1:
        return <Wait reload={() => this.checkTurn()} />;
        break;
      case 2:
        return (
          <View style={styles.containerLR}>
            <Write reload={() => this.checkTurn()} />
            <Image
              source={{
                uri: this.state.imagen,
              }}
              style={styles.picture}
            />
          </View>
        );
        break;
      case 3:
        return (
          <View style={styles.containerLR}>
            <View
              style={{
                width: "35%",
                flexDirection: "column",
                position: "absolute",
                right: "32%",
                top: screen.height * 0.2,
              }}
            >
              <Text style={styles.texto}>Ahora dibuja:</Text>
              <Text style={styles.texto}>{this.state.queDibujo}</Text>
            </View>
            <View style={{ width: "50%", left: "30%", bottom: "2%" }}>
              <Draw reload={() => this.checkTurn()} />
            </View>
          </View>
        );
        break;
      case 4:
        this.props.navigation.navigate("Hilos");
        break;
      case 5:
        this.props.navigation.navigate("Score");
        break;
      default:
        return <Text>k verga hago aki</Text>;
        break;
    }
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
        <View style={styles.gamezone}>
          {this.isLoading ? this.renderLoading() : this.renderMode()}
        </View>
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
    paddingBottom: "2%",
  },
  lobbyText: {
    fontSize: 19,
    fontWeight: "bold",
    left: "30%",
    color: "white",
  },
  gamezone: {
    height: "82%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "baseline",
  },
  texto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  containerLR: {
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: "row",
  },
  picture: {
    backgroundColor: "white",
    borderRadius: 10,
    width: screen.width * 0.44,
    height: screen.width * 0.44,
    bottom: "3%",
  },
});

export default TurnScreen;

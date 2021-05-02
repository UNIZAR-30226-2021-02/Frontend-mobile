import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { GameItem } from "../components/RowItem";
import Colors from "../constants/colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import ListaPartidas from "../components/ListaPartidas";
import APIKit, { setGameId, setInviteName } from "../util/APIKit";
import URI from "../constants/apiUris";
import { ScrollView } from "react-native-gesture-handler";
import globalStyles from "../constants/styles";
import ListaInvitaciones from "../components/ListaInvitaciones";


const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
    alignItems: "center",
  },
  textinput: {
    width: "50%",
    color: Colors.grey,
    backgroundColor: Colors.white,
    paddingLeft: "2%",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    right: "20%",
  },
  createContainer: {
    top: "10%",
    left: "28%",
    flexDirection: "row",
  },
  listaPartidas: {
    top: "12%",
  },
  toggle: {
    top: "5%",
    flexDirection: "row",
  },
});

const partidas = "Partidas";
const invitaciones = "Invitaciones";

const initialState = {
  newGame: "",
  friendInvite: "",
  game: "",
  errors: {},
  selectedButton: partidas,
};

class Games extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onNewGameChange = (newGame) => {
    this.setState({ newGame });
    console.log("Tengi: " + newGame);
  };

  onGameInviteChange = (game) => {
    this.setState({ game });
    console.log("Tengi: " + game);
  };

  onFriendInviteChange = (friendInvite) => {
    this.setState({ friendInvite });
    console.log("Tengi: " + friendInvite);
  };

  onPressCreate() {
    console.log(this.state);
    const { newGame } = this.state;
    const payload = JSON.stringify({ nombre: newGame });
    console.log("Se envía " + payload);

    const onSuccess = ({ data }) => {
      console.log("Enviado manin " + data);
      ToastAndroid.show("Game " + newGame + " created!", ToastAndroid.SHORT);
      this.setState({ isLoading: false });
      setGameId(data.id);
      this.props.navigation.navigate("Lobby")

    };

    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ isLoading: false });

    };

    this.setState({ isLoading: true });

    APIKit.post(URI.newGame, payload).then(onSuccess).catch(onFailure);
  }

  GameList() {
    return (
      <View>
        <View style={styles.createContainer}>
          <TextInput
            style={styles.textinput}
            placeholder="Game to create"
            onChangeText={this.onNewGameChange}
          />
          <TouchableOpacity onPress={this.onPressCreate.bind(this)}>
            <AntDesign name="play" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.listaPartidas}>
          <ListaPartidas
            action={() => this.props.navigation.navigate("Lobby")}
            action2={() => this.props.navigation.navigate("Turn")}
          />
        </View>
      </View>
    );
  }

  PetisList() {
    return (
      <View style={styles.listaPartidas}>
        <ListaInvitaciones />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={globalStyles.background}>
        <View style={styles.toggle}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ selectedButton: partidas });
              console.log("voy " + this.state.selectedButton);
            }}
            style={
              this.state.selectedButton == partidas
                ? globalStyles.toggleSelectedButton
                : globalStyles.toggleButton
            }
          >
            <Text style={globalStyles.toggleFont}>Partidas </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ selectedButton: invitaciones });
              console.log("voy " + this.state.selectedButton);
            }}
            style={
              this.state.selectedButton == invitaciones
                ? globalStyles.toggleSelectedButton
                : globalStyles.toggleButton
            }
          >
            <Text style={globalStyles.toggleFont}> Invitaciones</Text>
          </TouchableOpacity>
        </View>
        {this.state.selectedButton == partidas
          ? this.GameList()
          : this.PetisList()}
      </SafeAreaView>
    );
  }
}

export default Games;

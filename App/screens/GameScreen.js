import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GameItem } from "../components/RowItem";
import Colors from "../constants/colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import ListaPartidas from "../components/ListaPartidas";
import APIKit, { setGameId, setInviteName } from "../util/APIKit";
import URI from "../constants/apiUris";
import { ScrollView } from "react-native-gesture-handler";
import ListaPetis from "../components/ListaPetis";
import ListaInvitaciones from "../components/ListaInvitaciones";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
    alignItems: "center",
  },
  textinput: {
    width: "40%",
    color: Colors.grey,
    backgroundColor: Colors.white,
    paddingLeft: "1%",
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
      this.setState({ isLoading: false });
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };

    this.setState({ isLoading: true });

    APIKit.post(URI.newGame, payload).then(onSuccess).catch(onFailure);
  }

  onPressInvite() {
    console.log(this.state);
    const { game, friendInvite } = this.state;
    setInviteName(friendInvite);
    setGameId(game);

    const onSuccess = ({ data }) => {
      console.log("Enviado manin " + data);
      this.setState({ isLoading: false });
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };

    this.setState({ isLoading: true });

    APIKit.get(URI.inviteGame).then(onSuccess).catch(onFailure);
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
            <AntDesign name="play" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.listaPartidas}>
          <ListaPartidas
            action={() => this.props.navigation.navigate("Lobby")}
          />
        </View>
      </View>
    );
  }

  PetisList() {
    return (
      <View>
        <View style={styles.createContainer}>
          <TextInput
            style={styles.textinput}
            placeholder="Game to invite"
            onChangeText={this.onGameInviteChange}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Friend to invite"
            onChangeText={this.onFriendInviteChange}
          />
          <TouchableOpacity onPress={this.onPressInvite.bind(this)}>
            <Entypo name="add-user" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.listaPartidas}>
          <ListaInvitaciones />
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.toggle}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ selectedButton: partidas });
              console.log("voy " + this.state.selectedButton);
            }}
            style={
              this.state.selectedButton == partidas
                ? styles.selectedButton
                : styles.button
            }
          >
            <Text>Partidas </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ selectedButton: invitaciones });
              console.log("voy " + this.state.selectedButton);
            }}
            style={
              this.state.selectedButton == invitaciones
                ? styles.selectedButton
                : styles.button
            }
          >
            <Text> Invitaciones</Text>
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

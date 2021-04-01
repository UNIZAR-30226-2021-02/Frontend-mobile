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
import { Entypo } from "@expo/vector-icons";
import ListaAmigos from "../components/ListaAmigos";
import ListaPetis from "../components/ListaPetis";
import Colors from "../constants/colors";
import APIKit from "../util/APIKit";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    flex: 1,
    alignItems: "center",

    justifyContent: "space-between",
  },

  addContainer: {
    top: "3%",
    start: "4%",
    padding: "5%",
    alignItems: "center",

    //backgroundColor: "blue",
    width: "85%",
  },
  textinput: {
    width: "55%",
    color: Colors.grey,
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  addFriend: {
    paddingLeft: 10,
  },
  searchBar: {
    flexDirection: "row",
    marginBottom: 10,
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 220,
    height: 40,
    backgroundColor: "red",
    marginLeft: 40,
    marginRight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    width: 220,
    height: 40,
    backgroundColor: "green",
    marginLeft: 40,
    marginRight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  petitionsContainer: {
    width: "110%",
    height: "70%",
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  friendsContainer: {
    width: "35%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    width: "85%",
  },
});
const rnk = "Rankig";
const add = "Add friends";
const initialState = {
  searchUser: "",
  myName: "",
  errors: {},
  selectedButton: rnk,
};

class Friends extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onUserSearchChange = (searchUser) => {
    this.setState({ searchUser });
  };

  onPressAdd() {
    const { searchUser } = this.state;
    const payload = JSON.stringify({ nombre: searchUser });
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

    APIKit.post("/sendRequest", payload).then(onSuccess).catch(onFailure);
  }

  onPressDelete() {
    const { searchUser } = this.state;
    const payload = JSON.stringify({ nombre: searchUser });
    console.log("Se envía " + payload);

    const onSuccess = ({ data }) => {
      console.log("Eliminado manin " + data);
      this.setState({ isLoading: false });
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };

    this.setState({ isLoading: true });

    APIKit.post("/deleteFriend", payload).then(onSuccess).catch(onFailure);
  }

  onAcceptRequest() {
    const { searchUser } = this.state;
    const payload = JSON.stringify({ nombre: searchUser });
    console.log("Se envía " + payload);

    const onSuccess = ({ data }) => {
      console.log("Aceptado manin " + data);
      this.setState({ isLoading: false });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };

    this.setState({ isLoading: true });
    APIKit.post("/acceptRequest", payload).then(onSuccess).catch(onFailure);
  }

  onDenyRequest() {
    const { searchUser } = this.state;
    const payload = JSON.stringify({ nombre: searchUser });
    console.log("Se envía " + payload);

    const onSuccess = ({ data }) => {
      console.log("Rechazado manin " + data);
      this.setState({ isLoading: false });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };

    this.setState({ isLoading: true });
    APIKit.post("/denyRequest", payload).then(onSuccess).catch(onFailure);
  }

  listFriends() {
    const onSuccess = ({ data }) => {
      console.log("Nos devuelve los amigos: " + JSON.stringify(data));
      this.setState({ isLoading: false });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };
    this.setState({ isLoading: true });
    APIKit.get("/listFriends").then(onSuccess).catch(onFailure);
  }

  listRequests() {
    const onSuccess = ({ data }) => {
      console.log("Nos devuelve las peticiones: " + JSON.stringify(data));
      this.setState({ isLoading: false });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };
    this.setState({ isLoading: true });
    APIKit.get("/listRequest").then(onSuccess).catch(onFailure);
  }

  button(name) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ selectedButton: name });
          console.log("voy " + this.state.selectedButton);
        }}
        style={
          this.state.selectedButton == name
            ? styles.selectedButton
            : styles.button
        }
      >
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  }

  RankigList() {
    return (
      //general
      <View style={styles.friendsContainer}>
        <ListaAmigos />
      </View>
    );
  }

  AddFriendList() {
    return (
      //general
      <View style={styles.addContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.textinput}
            placeholder=" Friend to search"
            onChangeText={this.onUserSearchChange}
          />
          <TouchableOpacity
            style={styles.addFriend}
            onPress={this.onPressAdd.bind(this)}
          >
            <Entypo name="add-user" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addFriend}
            onPress={this.listRequests.bind(this)}
          >
            <Entypo name="add-user" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addFriend}
            onPress={this.listFriends.bind(this)}
          >
            <Entypo name="add-user" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addFriend}
            onPress={this.onAcceptRequest.bind(this)}
          >
            <Entypo name="add-user" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addFriend}
            onPress={this.onDenyRequest.bind(this)}
          >
            <Entypo name="add-user" size={24} color="brown" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addFriend}
            onPress={this.onPressDelete.bind(this)}
          >
            <Entypo name="add-user" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.petitionsContainer}>
          <ListaPetis />
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          {this.button(rnk)}
          {this.button(add)}
        </View>
        {this.state.selectedButton == rnk
          ? this.RankigList()
          : this.AddFriendList()}
      </SafeAreaView>
    );
  }
}

export default Friends;

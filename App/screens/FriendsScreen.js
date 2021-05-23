import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import ListaAmigos from "../components/ListaAmigos";
import ListaPetis from "../components/ListaPetis";
import Colors from "../constants/colors";
import APIKit from "../util/APIKit";
import globalStyles from "../constants/styles";

const rnk = "Ranking";
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
    const payload = JSON.stringify({ mail: searchUser });
    console.log("Se envía " + payload);

    const onSuccess = ({ data }) => {
      console.log("Enviado manin " + data);
      ToastAndroid.show(
        "Friend request sent to: " + searchUser,
        ToastAndroid.SHORT
      );
      this.setState({ isLoading: false });
    };

    const onFailure = (error) => {
      console.log(error);
      this.setState({ errors: error.response.data, isLoading: false });
      if (error.message == "Request failed with status code 417") {
        Alert.alert(
          "Este usuario ya tiene una petición de amistad suya o ya es su amigo."
        );
      } else {
        Alert.alert("Nombre de usuario no válido.");
      }
    };

    this.setState({ isLoading: true });

    APIKit.post("/sendRequest", payload).then(onSuccess).catch(onFailure);
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
            ? globalStyles.toggleSelectedButton
            : globalStyles.toggleButton
        }
      >
        <Text style={globalStyles.toggleFont}>{name}</Text>
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
            placeholder="Friend to search"
            onChangeText={this.onUserSearchChange}
          />
          <TouchableOpacity
            style={styles.addFriend}
            onPress={this.onPressAdd.bind(this)}
          >
            <Entypo name="add-user" size={24} color="white" />
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
      <SafeAreaView style={globalStyles.background}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    flex: 1,
    alignItems: "center",

    justifyContent: "space-between",
  },

  addContainer: {
    padding: "5%",
    alignItems: "center",
    //backgroundColor: "blue",
    width: "85%",
  },
  textinput: {
    paddingLeft: 6,
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
  },
  header: {
    marginTop: 30,
    marginBottom: 10,
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
    top: "2%",
    width: "110%",
    height: "80%",
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

export default Friends;

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
//import { Menu } from "../components/NavBar";
import Colors from "../constants/colors";
import { Entypo } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    flexDirection: "row",
    flex: 1,
  },
  leftContainer: { flexDirection: "column" },
  addContainer: {
    top: "3%",
    start: "4%",
    padding: "5%",
    flexDirection: "row",
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
  petitionsContainer: {
    padding: 40,
    start: "9%",
    width: "60%",
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
    top: "5%",
    right: "5%",
    width: "35%",
    height: "80%",
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
});

const initialState = {
  searchUser: "",
  myName: "",
  errors: {},
};

class Friends extends Component {
  state = initialState;
  onUserSearchChange = (searchUser) => {
    this.setState({ searchUser });
    console.log(searchUser);
  };

  onPressAdd() {
    /*
    const { username, password } = this.state;
    const payload = JSON.stringify({ nombre: username, password: password });
    console.log(payload);

    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      setClientToken(data.token);
      this.setState({ isLoading: false, isAuthorized: true });
      this.props.navigation.navigate("Home");
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };

    // Show spinner when call is made
    this.setState({ isLoading: true });

    APIKit.post("/login", payload).then(onSuccess).catch(onFailure);
    */
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.addContainer}>
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
          </View>
          <View style={styles.petitionsContainer}></View>
        </View>
        <View style={styles.friendsContainer}></View>
      </SafeAreaView>
    );
  }
}

export default Friends;

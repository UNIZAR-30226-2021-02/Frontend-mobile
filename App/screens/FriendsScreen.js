import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
//import { Menu } from "../components/NavBar";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

const initialState = {
  searchUser: "",
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
        <TextInput
          placeholder="Friend to search"
          onChangeText={this.onUserSearchChange}
        />
        <TouchableOpacity onPress={this.onPressAdd.bind(this)}>
          <Text>Add friend</Text>
        </TouchableOpacity>
        <Text>Friends</Text>
      </SafeAreaView>
    );
  }
}

export default Friends;

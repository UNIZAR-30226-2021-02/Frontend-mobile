import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, Button, Image } from "react-native";
//import { Menu } from "../components/NavBar";
import axios from "axios";
//import { Buffer } from "buffer";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

const initialState = { hasPict: false };
class Shop extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Shop</Text>
      </SafeAreaView>
    );
  }
}
export default Shop;

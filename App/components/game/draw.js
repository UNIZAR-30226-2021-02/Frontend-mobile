import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Draw extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>xd</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  canvas: {
    height: 100,
    width: 100,
  },
});

export default Draw;

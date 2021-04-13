import React, { Component } from "react";
import { Text, Button, View } from "react-native";
class Lobby extends Component {
  render() {
    return (
      <View>
        <Text>Lobby</Text>
        <Button
          title="si"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

export default Lobby;

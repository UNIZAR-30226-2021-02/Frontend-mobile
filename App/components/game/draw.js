import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import ExpoDraw from "expo-draw";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";

import Uri from "../../constants/apiUris";
import ApiKit from "../../util/APIKit";

class Draw extends Component {
  mySaveFx = async () => {
    const signatureResult = await takeSnapshotAsync(this.refOfExpoDrawElement, {
      result: "tmpfile",
      quality: 0.5,
      format: "png",
    });

    //The output will be a local tmpfile (uri)[String], with the current lines that were drawn. Therefore, you can save it or so! ;)
    console.log(signatureResult);
  };
  uploadImage = () => {
    // Check if any file is selected or not
    console.log("hola");
    // If file selected then create FormData
    //this.mySaveFx();
  };
  render() {
    return (
      <View style={styles.container}>
        <ExpoDraw
          strokes={[]}
          containerStyle={styles.canvas}
          rewind={(undo) => {
            this._undo = undo;
          }}
          clear={(clear) => {
            this._clear = clear;
          }}
          color={"#000000"}
          strokeWidth={4}
          enabled={true}
          onChangeStrokes={(strokes) => console.log(strokes)}
        />
        <TouchableOpacity
          style={styles.button}
          onPess={() => {
            console.log("hola");
          }}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  canvas: {
    height: 500,
    width: 500,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "blue",
  },
});

export default Draw;

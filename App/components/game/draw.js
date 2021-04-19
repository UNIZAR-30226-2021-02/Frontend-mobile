import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import ExpoDraw from "expo-draw";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";

import Uri from "../../constants/apiUris";
import ApiKit from "../../util/APIKit";

class Draw extends Component {
  mySaveFx = async () => {
    const signatureResult = await takeSnapshotAsync(this.screenshot, {
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
    this.mySaveFx().catch((e) => {
      console.log(e);
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          collapsable={false}
          ref={(shot) => {
            this.screenshot = shot;
          }}
        >
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
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.uploadImage();
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
    height: 2,
    width: 100,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "blue",
  },
});

export default Draw;

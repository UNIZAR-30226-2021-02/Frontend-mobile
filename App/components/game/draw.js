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
    //console.log(signatureResult);
    return signatureResult;
  };
  uploadImage = () => {
    // Check if any file is selected or not

    // If file selected then create FormData
    this.mySaveFx()
      .then((img) => {
        let body = new FormData();
        body.append("contenido", {
          uri: img,
          name: "photo.png",
          type: "image/png",
        });
        body.append("Content-Type", "image/png");

        fetch("http://80.39.50.206:8082/api/addImage", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            idPartida: "27",
            autor: "user",
          },
          body: body,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log("response" + JSON.stringify(res));
          })
          .catch((e) => console.log(e))
          .done();
      })
      .catch((e) => {
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

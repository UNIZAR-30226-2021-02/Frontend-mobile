import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import ExpoDraw from "expo-draw";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import Colors from "../../constants/colors";
import URI from "../../constants/apiUris";
import APIKit from "../../util/APIKit";
const screen = Dimensions.get("window");

const initialState = {
  color: "black",
  tama: 4,
};

class Draw extends Component {
  state = initialState;
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
        const onSuccess = ({ data }) => {
          console.log("OK :" + data);
        };
        const onFailure = (error) => {
          console.log(error.message);
          if (error.message == "Request failed with status code 417") {
            Alert.alert(
              "El jugador no pertenece a la partida o ya ha jugado ese turno."
            );
          }
          this.setState({ isLoading: false });
          //Alert.alert("No se puede conectar al servidor, pruebe más tarde ");
        };
        let body = new FormData();
        body.append("contenido", {
          uri: img,
          name: "photo.png",
          type: "image/png",
        });
        body.append("Content-Type", "image/png");

        APIKit.post(URI.sendImg, body).then(onSuccess).catch(onFailure);
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
            color={this.state.color}
            strokeWidth={4}
            enabled={this.state.tama}
            onChangeStrokes={(strokes) => console.log(strokes)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.uploadImage();
          }}
        >
          <Text style={styles.textButton}>Send</Text>
        </TouchableOpacity>
        <View style={styles.drawColors}>
          <TouchableOpacity style={styles.pequeño}></TouchableOpacity>
          <TouchableOpacity style={styles.mediano}></TouchableOpacity>
          <TouchableOpacity style={styles.grande}></TouchableOpacity>
          <TouchableOpacity
            style={styles.negro}
            onPress={() => this.setState({ color: "black" })}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.blanco}
            onPress={() => this.setState({ color: "white" })}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.rojo}
            onPress={() => this.setState({ color: "red" })}
          ></TouchableOpacity>
          <TouchableOpacity style={styles.naranja}></TouchableOpacity>
          <TouchableOpacity style={styles.amarillo}></TouchableOpacity>
          <TouchableOpacity style={styles.verde}></TouchableOpacity>
          <TouchableOpacity style={styles.azul}></TouchableOpacity>
          <TouchableOpacity style={styles.morado}></TouchableOpacity>
        </View>
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
    width: 330,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    bottom: "2%",
    left: "9%",
  },
  button: {
    bottom: "35%",
    right: "77%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.cyan,
    height: "13%",
    width: "22%",
  },
  textButton: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "bold",
  },
  drawColors: {
    backgroundColor: "grey",
    width: "85%",
    height: "10%",
    bottom: "13%",
    left: "9.2%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pequeño: {
    width: screen.height * 0.04,
    height: screen.height * 0.04,
    borderRadius: 20,
    backgroundColor: "black",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
  mediano: {
    width: screen.height * 0.05,
    height: screen.height * 0.05,
    borderRadius: 20,
    backgroundColor: "black",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
  grande: {
    width: screen.height * 0.06,
    height: screen.height * 0.06,
    borderRadius: 20,
    backgroundColor: "black",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
  negro: {
    width: screen.height * 0.06,
    height: screen.height * 0.06,
    borderRadius: 3,
    backgroundColor: "black",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
  rojo: {
    width: screen.height * 0.06,
    height: screen.height * 0.06,
    borderRadius: 3,
    backgroundColor: "red",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
  naranja: {
    width: screen.height * 0.06,
    height: screen.height * 0.06,
    borderRadius: 3,
    backgroundColor: "orange",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
  amarillo: {
    width: screen.height * 0.06,
    height: screen.height * 0.06,
    borderRadius: 3,
    backgroundColor: "yellow",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
  verde: {
    width: screen.height * 0.06,
    height: screen.height * 0.06,
    borderRadius: 3,
    backgroundColor: "green",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
  azul: {
    width: screen.height * 0.06,
    height: screen.height * 0.06,
    borderRadius: 3,
    backgroundColor: "blue",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
  morado: {
    width: screen.height * 0.06,
    height: screen.height * 0.06,
    borderRadius: 3,
    backgroundColor: "purple",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
  blanco: {
    width: screen.height * 0.06,
    height: screen.height * 0.06,
    borderRadius: 3,
    backgroundColor: "white",
    left: screen.height * 0.02,
    right: screen.height * 0.02,
  },
});

export default Draw;

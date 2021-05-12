import React, { Component, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { Draw, DrawRef } from "@benjeau/react-native-draw";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import Colors from "../../constants/colors";
import URI from "../../constants/apiUris";
import APIKit from "../../util/APIKit";
const screen = Dimensions.get("window");

const initialState = {
  color: "black",
  tama: 4,
  hidden: true,
};
let drawRef = useRef < DrawRef > null;
const bn = [["black", "white"]];
const colors = [["red", "orange", "yellow", "green", "blue", "purple"]];
const colorines = [colors, bn];
class Drawer extends Component {
  state = initialState;
  mySaveFx = async () => {
    const signatureResult = await takeSnapshotAsync(this.screenshot, {
      result: "tmpfile",
      quality: 0.6,
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
          ToastAndroid.show("Dibujo enviado", ToastAndroid.SHORT);
          this.props.reload();
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
          style={styles.screenshoto}
          collapsable={false}
          ref={(shot) => {
            this.screenshot = shot;
          }}
        >
          <Draw
            ref={drawRef}
            height={300}
            width={300}
            colors={colorines}
            autoDismissColorPicker={true}
            initialValues={{
              color: "black",
              thickness: 5,
              opacity: 0.9,
              paths: [],
            }}
            brushPreview="none"
            canvasStyle={{
              elevation: 0,
              backgroundColor: "white",
              borderRadius: 11,
            }}
            buttonStyle={{
              width: screen.height * 0.07,
              height: screen.height * 0.07,
              bottom: screen.height * 0.02,
              justifyContent: "center",
            }}
            hideBottom={this.state.hidden}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({ hidden: true });
            this.uploadImage();
          }}
        >
          <Text style={styles.textButton}>Send</Text>
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
  screenshoto: {
    left: screen.height * 0.14,
    bottom: screen.height * 0.03,
  },
});

export default Drawer;

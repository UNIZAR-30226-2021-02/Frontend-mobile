import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  Image,
  View,
} from "react-native";
import {
  FontAwesome5,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import URI from "../constants/apiUris";
import APIKit from "../util/APIKit";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerPtsLGD: {
    flexDirection: "row",
  },
  containerEMA: {
    flexDirection: "row",
  },
  picture: { width: 50, height: 50 },
});

const initialState = {
  nombre: "",
  fotPerf: null,
  estrellas: 0,
  monedas: 0,
  pDibujo: 0,
  pListo: 0,
  pGracioso: 0,
  nAmigos: 0,
  errors: {},
};

class Profile extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.state.data = this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true });

    const onSuccess = ({ data }) => {
      console.log("Nos devuelve las peticiones: " + JSON.stringify(data));
      this.setState({
        data: data,
      });
      this.setState({
        nombre: data.nombre,
        fotPerf: data.fotPerf,
        estrellas: data.estrellas,
        monedas: data.monedas,
        pDibujo: data.pDibujo,
        pListo: data.pListo,
        pGracioso: data.pGracioso,
        nAmigos: data.nAmigos,
      });
      this.setState({ loading: false });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, loading: false });
    };
    this.setState({ loading: true });
    APIKit.get(URI.viewProfile).then(onSuccess).catch(onFailure);
  };
  state = {};

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={{
            uri: this.state.fotPerf,
          }}
          style={styles.picture}
        />
        <TextInput>{this.state.nombre}</TextInput>
        <View style={styles.containerPtsLGD}>
          <FontAwesome name="pencil" size={18} color="black" />
          <Text>{this.state.pDibujo}</Text>
          <MaterialCommunityIcons name="brain" size={18} color="black" />
          <Text>{this.state.pListo}</Text>
          <Ionicons name="md-happy-outline" size={18} color="black" />
          <Text>{this.state.pGracioso}</Text>
        </View>
        <View style={styles.containerEMA}>
          <AntDesign name="staro" size={18} color="black" />
          <Text>{this.state.estrellas}</Text>
        </View>
        <View style={styles.containerEMA}>
          <FontAwesome5 name="coins" size={18} color="black" />
          <Text>{this.state.monedas}</Text>
        </View>
        <View style={styles.containerEMA}>
          <FontAwesome name="user" size={18} color="black" />
          <Text>{this.state.nAmigos}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Profile;

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
  containerPts: {
    backgroundColor: "pink",
    flexDirection: "row",
    borderColor: "black",
    borderRadius: 9,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 8,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.27,
    elevation: 7,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  interiorIcon: {
    paddingTop: 2,
    paddingLeft: 6,
    paddingBottom: 2,
  },
  interiorVal: {
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 6,
    paddingBottom: 2,
  },
  separador: {
    borderRightWidth: 1,
  },
  picture: { width: 70, height: 70 },
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
        fotPerf: URI.img + data.fotPerf,
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
        <TextInput style={styles.nombre}>{this.state.nombre}</TextInput>
        <View style={styles.containerPts}>
          <FontAwesome
            style={styles.interiorIcon}
            name="pencil"
            size={18}
            color="black"
          />
          <Text style={styles.interiorVal}>{this.state.pDibujo}</Text>
          <View style={styles.separador} />
          <MaterialCommunityIcons
            style={styles.interiorIcon}
            name="brain"
            size={18}
            color="black"
          />
          <Text style={styles.interiorVal}>{this.state.pListo}</Text>
          <View style={styles.separador} />
          <Ionicons
            style={styles.interiorIcon}
            name="md-happy-outline"
            size={18}
            color="black"
          />
          <Text style={styles.interiorVal}>{this.state.pGracioso}</Text>
        </View>
        <View style={styles.containerPts}>
          <AntDesign
            style={styles.interiorIcon}
            name="staro"
            size={18}
            color="black"
          />
          <Text style={styles.interiorVal}>{this.state.estrellas}</Text>
        </View>
        <View style={styles.containerPts}>
          <FontAwesome5
            style={styles.interiorIcon}
            name="coins"
            size={18}
            color="black"
          />
          <Text style={styles.interiorVal}>{this.state.monedas}</Text>
        </View>
        <View style={styles.containerPts}>
          <FontAwesome
            style={styles.interiorIcon}
            name="user"
            size={18}
            color="black"
          />
          <Text style={styles.interiorVal}>{this.state.nAmigos}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Profile;

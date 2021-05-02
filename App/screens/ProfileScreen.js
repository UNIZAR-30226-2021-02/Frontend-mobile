import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  Image,
  View,
  Touchable,
  Alert,
} from "react-native";
import {
  FontAwesome5,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import URI from "../constants/apiUris";
import APIKit, {
  setClientName,
  setClientToken,
  setClientMail,
} from "../util/APIKit";

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
  cambiarView: {
    paddingLeft: "78%",
  },
  cambiarButton: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "blue",
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
  cambiarButtonTransp: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 205, 0.6)",
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
  cambiarFont: {
    fontSize: 13,
  },
  signOutImage: {
    top: "1%",
    flexDirection: "row",
    left: "5%",
  },
});

const DiffName = (props) => {
  const { transparent, onPress } = props;
  if (transparent) {
    return (
      <View style={styles.cambiarView}>
        <View style={styles.cambiarButtonTransp}>
          <Text style={styles.cambiarFont}>Change</Text>
          <Text style={styles.cambiarFont}> Username </Text>
        </View>
      </View>
    );
  }
  if (transparent == null) {
    return null;
  }
  return (
    <View style={styles.cambiarView}>
      <TouchableOpacity style={styles.cambiarButton} onPress={onPress}>
        <Text style={styles.cambiarFont}>Change</Text>
        <Text style={styles.cambiarFont}> Username </Text>
      </TouchableOpacity>
    </View>
  );
};

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
  hide: true,
  nombreViejo: "",
  transparent: true,
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
        nombreViejo: data.nombre,
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

  onPressChange() {
    const { nombre } = this.state;
    const payload = JSON.stringify({ nombre: nombre });
    console.log(payload);

    const onSuccess = ({ data }) => {
      setClientName(this.state.nombre);
      console.log("Cambiado " + this.state.nombre);
      this.setState({ isLoading: false });
    };

    const onFailure = (error) => {
      console.log("Petición fallida ");

      this.setState({ isLoading: false });
      if (error.message == "Request failed with status code 417") {
        Alert.alert("Ya existe un usuario con ese nombre, inténtelo con otro.");
      } else {
        Alert.alert(
          "No se puede conectar con el servidor, inténtelo más tarde."
        );
      }
    };

    this.setState({ isLoading: true });

    APIKit.post(URI.changeName, payload).then(onSuccess).catch(onFailure);
  }

  state = {};

  signOut() {
    setClientToken("");
    AsyncStorage.setItem("@token", "");
    setClientMail("");
    AsyncStorage.setItem("@mail", "");
    this.props.navigation.navigate("LoginScreen");
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.signOutImage}>
          <Image
            source={{
              uri: this.state.fotPerf,
            }}
            style={styles.picture}
          />
          <View style={{ left: "255%" }}>
            <TouchableOpacity>
              <FontAwesome
                onPress={this.signOut}
                name="sign-out"
                size={40}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.nombre}
            onChangeText={(text) => {
              this.state.nombre = text;
              if (this.state.nombre != this.state.nombreViejo) {
                this.setState({ transparent: false });
              } else {
                this.setState({ transparent: true });
              }
            }}
          >
            {this.state.nombre}
          </TextInput>
        </View>
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
        <DiffName
          onPress={this.onPressChange.bind(this)}
          transparent={this.state.transparent}
        />
        {/*
        <View style={styles.cambiarView}>
          <TouchableOpacity
            style={styles.cambiarButton}
            onPress={this.onPressChange.bind(this)}
          >
            <Text style={styles.cambiarFont}>Change</Text>
            <Text style={styles.cambiarFont}> Username </Text>
          </TouchableOpacity>
        </View>*/}
      </SafeAreaView>
    );
  }
}

export default Profile;

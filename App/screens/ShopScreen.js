import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  Alert,
  ToastAndroid,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import URI from "../constants/apiUris";
import APIKit, { setMonedas, setCompra, setEquipado } from "../util/APIKit";
import Grid from "react-native-grid-component";
import globalStyles from "../constants/styles";
import Colors from "../constants/colors";
const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  containerCoinsShop: {
    paddingEnd: "75%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "4%",
  },
  containerPts: {
    backgroundColor: Colors.background,
    flexDirection: "row",
    borderColor: "white",
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
  interiorIcon: {
    paddingTop: 2,
    paddingLeft: 6,
    paddingBottom: 2,
  },
  interiorVal: {
    color: "white",
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 6,
    paddingBottom: 2,
  },
  list: {
    top: "18%",
    left: "8.5%",
    width: 600,
  },
  list2: {
    bottom: "5%",
    left: "8.5%",
    width: 600,
  },
  item: {
    width: "13%",
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  shopZone: {
    //width:500,
    borderRadius: 20,
    marginLeft: "20%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  back: {
    right: screen.width * 0.16,
    width: screen.width * 0.8,
    height: screen.height * 0.8,
    borderRadius: 20,
    top: "3%",
    backgroundColor: "white",
    marginLeft: 100,
    paddingLeft: "15%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  picture: {
    height: 50,
    width: 50,
  },
  shopStyle: {
    color: "white",
    paddingTop: 2,
    left: "30%",
    paddingRight: 6,
    paddingBottom: 2,
    fontWeight: "bold",
    fontSize: 18,
  },
  price: {
    fontWeight: "bold",
  },
  round: {
    top: "5%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#e5e5e5",
  },
});

const initialState = { hasPict: false, avatares: [], avataresComprados: [] };
class Shop extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.loadData();
  }
  componentDidMount() {
    this.loadData();
  }

  getMilMonedas() {
    this.setState({ loading: true });
    setMonedas(1000);
    const onSuccess = ({ data }) => {
      console.log("Toma dinero uwu");
      this.setState({ loading: false });
    };
    const onFailure = (error) => {
      console.log("WTFFFFFFFFFFFFFFFFFFFFFFF");
      this.setState({ errors: error.response.data, loading: false });
    };
    this.setState({ loading: true });
    APIKit.get(URI.gimmeMoney).then(onSuccess).catch(onFailure);
  }

  getMonedas() {
    this.setState({ loading: true });
    const onSuccess = ({ data }) => {
      console.log("Nos devuelve las peticiones: " + JSON.stringify(data));

      this.setState({
        monedas: data.monedas,
      });
      this.setState({ loading: false });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, loading: false });
    };
    this.setState({ loading: true });
    APIKit.get(URI.viewProfile).then(onSuccess).catch(onFailure);
  }

  getAvatares() {
    const onSuccess = ({ data }) => {
      this.setState({ loading: false });
      console.log("AAAAA " + JSON.stringify(data));
      this.setState({
        avatares: data,
      });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, loading: false });
    };
    //this.setState({ loading: true });
    APIKit.get(URI.getShop).then(onSuccess).catch(onFailure);
  }

  onPressBuy(idFoto) {
    setCompra(idFoto);
    const onSuccess = ({ data }) => {
      console.log("Cambiado ");
      this.setState({ isLoading: false });
      this.getAvataresComprados();
      this.getMonedas();
      this.getAvatares();
      ToastAndroid.show("Nuevo avatar comprado", ToastAndroid.SHORT);
    };

    const onFailure = (error) => {
      console.log("Petición fallida ");

      this.setState({ isLoading: false });
      if (error.message == "Request failed with status code 417") {
        Alert.alert("No puedes comprar este avatar.");
      } else {
        Alert.alert(
          "No se puede conectar con el servidor, inténtelo más tarde."
        );
      }
    };
    this.setState({ isLoading: true });
    APIKit.get(URI.buyAvatar).then(onSuccess).catch(onFailure);
  }

  onPressChange(idFoto) {
    setEquipado(idFoto);
    const onSuccess = ({ data }) => {
      this.setState({ isLoading: false });
      ToastAndroid.show("Avatar cambiado", ToastAndroid.SHORT);
    };

    const onFailure = (error) => {
      console.log("Petición fallida " + error);

      this.setState({ isLoading: false });
      if (error.message == "Request failed with status code 417") {
        Alert.alert("No puedes comprar este avatar.");
      } else {
        Alert.alert(
          "No se puede conectar con el servidor, inténtelo más tarde."
        );
      }
    };

    this.setState({ isLoading: true });

    APIKit.get(URI.changeImgProfile).then(onSuccess).catch(onFailure);
  }

  getAvataresComprados() {
    const onSuccess = ({ data }) => {
      this.setState({ loading: false });
      console.log("BBBB " + JSON.stringify(data));
      this.setState({
        avataresComprados: data,
      });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, loading: false });
    };
    //this.setState({ loading: true });
    APIKit.get(URI.getShopUnlocked).then(onSuccess).catch(onFailure);
  }

  loadData = () => {
    this.getMonedas();
    this.getAvatares();
    //this.getMilMonedas();
    this.getAvataresComprados();
  };
  state = {};

  _renderItem = (item, i) => (
    <View style={[styles.item]} key={item.idFoto}>
      <TouchableOpacity onPress={() => this.onPressBuy(item.idFoto)}>
        <Image
          source={{
            uri: URI.img + item.idFoto,
          }}
          style={styles.picture}
        />
        <View style={styles.round}>
          <Text style={styles.price}>{item.precio}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  _renderItemComprado = (item, i) => (
    <View style={[styles.item]} key={item.idFoto}>
      <TouchableOpacity onPress={() => this.onPressChange(item.idFoto)}>
        <Image
          source={{
            uri: URI.img + item.idFoto,
          }}
          style={styles.picture}
        />
      </TouchableOpacity>
    </View>
  );

  _renderPlaceholder = (i) => <View style={styles.item} key={i} />;

  render() {
    return (
      <SafeAreaView style={globalStyles.background}>
        <View style={styles.containerCoinsShop}>
          <View style={styles.containerPts}>
            <FontAwesome5
              style={styles.interiorIcon}
              name="coins"
              size={18}
              color="white"
            />
            <Text style={styles.interiorVal}>{this.state.monedas}</Text>
          </View>
          <Text style={styles.shopStyle}>SHOP</Text>
        </View>

        <View style={styles.shopZone}>
          <View style={styles.back}>
            <Text
              style={{
                top: "8%",
                fontSize: 17,
                fontWeight: "bold",
                right: "34%",
              }}
            >
              Avatares listos para equipar:
            </Text>
            <Grid
              style={styles.list}
              renderItem={this._renderItemComprado}
              renderPlaceholder={this._renderPlaceholder}
              data={this.state.avataresComprados}
              numColumns={5}
            />
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                right: "36%",
                bottom: "3%",
              }}
            >
              Avatares desbloqueables:
            </Text>
            <Grid
              style={styles.list2}
              renderItem={this._renderItem}
              renderPlaceholder={this._renderPlaceholder}
              data={this.state.avatares}
              numColumns={5}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default Shop;

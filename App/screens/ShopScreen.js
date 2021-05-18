import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import URI from "../constants/apiUris";
import APIKit from "../util/APIKit";
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
    top: "1.5%",
    width: "100%",
    height: 120,
  },
  item: {
    width: 100,
    height: 100,
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
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  picture: {
    height: 60,
    width: 60,
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

const initialState = { hasPict: false, avatares: [] };
class Shop extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.loadData();
  }
  componentDidMount() {
    this.loadData();
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
    this.setState({
      avatares: falseData,
    });
    const onSuccess = ({ data }) => {
      this.setState({ loading: false });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, loading: false });
    };
    //this.setState({ loading: true });
    // APIKit.get(URI.viewProfile).then(onSuccess).catch(onFailure);
  }

  loadData = () => {
    this.getMonedas();
    this.getAvatares();
  };
  state = {};

  _renderItem = (item, i) => (
    <View style={[styles.item]} key={i}>
      <TouchableOpacity onPress={() => console.log("pagar " + item.price)}>
        <Image
          source={{
            uri: URI.img + item.img,
          }}
          style={styles.picture}
        />
        <View style={styles.round}>
          <Text style={styles.price}>{item.price}</Text>
        </View>
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
            <Grid
              style={styles.list}
              renderItem={this._renderItem}
              renderPlaceholder={this._renderPlaceholder}
              data={this.state.avatares}
              numColumns={4}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default Shop;

const falseData = [
  { price: 100, img: "foto0.png" },
  { price: 120, img: "foto1.png" },
  { price: 130, img: "foto2.png" },
  { price: 1000, img: "foto3.png" },
];

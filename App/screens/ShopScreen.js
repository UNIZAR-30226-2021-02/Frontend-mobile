import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import URI from "../constants/apiUris";
import APIKit from "../util/APIKit";
import globalStyles from "../constants/styles";
import Colors from "../constants/colors";

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
  shopStyle: {
    color: "white",
    paddingTop: 2,
    left: "30%",
    paddingRight: 6,
    paddingBottom: 2,
    fontWeight: "bold",
    fontSize: 18,
  },
});

const initialState = { hasPict: false };
class Shop extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.loadData();
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    this.setState({ loading: true });
    const onSuccess = ({ data }) => {
      console.log("Nos devuelve las peticiones: " + JSON.stringify(data));
      this.setState({
        data: data,
      });
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
  };
  state = {};

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
      </SafeAreaView>
    );
  }
}
export default Shop;

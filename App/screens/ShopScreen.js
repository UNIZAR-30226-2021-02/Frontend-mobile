import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View ,TouchableOpacity,Image} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import URI from "../constants/apiUris";
import APIKit from "../util/APIKit";
import Grid from 'react-native-grid-component';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "center",
  },
  containerCoinsShop: {
    paddingEnd: "75%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "4%",
  },
  containerPts: {
    backgroundColor: "red",
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
  list: {
    width:600,
    height: 120,
  },
  item: {
    width:100,
    height: 100,
    margin: 10,
    alignItems:"center",
    justifyContent:"center",

  },
  shopZone:{
    //width:500,

    marginLeft:100,
    alignItems:"center",
    alignContent:"center",
    justifyContent:"center",
   


  },
  picture:{
    height:60,
    width:60
  }
  
});

const initialState = { hasPict: false , avatares:[]};
class Shop extends Component {
  constructor() {
    super();
    this.state = initialState;
  
  }
  componentDidMount(){
    this.loadData();
  }

  getMonedas(){
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

  getAvatares(){
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
   
    this.getMonedas()
    this.getAvatares()




  };
  state = {};

  _renderItem = (item, i) => (
    <View style={[ styles.item]} key={i} >
          <TouchableOpacity onPress={()=>console.log("pagar "+item.price)}>
        <Image
            source={{
              uri:  URI.img+item.img,
            }}
            style={styles.picture}
          />
          <Text>{item.price}</Text>
          </TouchableOpacity>
          </View>
  );
 
  _renderPlaceholder = i => <View style={styles.item} key={i} />;



  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerCoinsShop}>
          <View style={styles.containerPts}>
            <FontAwesome5
              style={styles.interiorIcon}
              name="coins"
              size={18}
              color="black"
            />
            <Text style={styles.interiorVal}>{this.state.monedas}</Text>
          </View>
          <Text>SHOP</Text>
        </View>


        <View style={styles.shopZone}>
        <Grid
        style={styles.list}
        renderItem={this._renderItem}
        renderPlaceholder={this._renderPlaceholder}
        data={this.state.avatares}
        numColumns={4}
      />
        </View>
      </SafeAreaView>
    );
  }
}
export default Shop;

const falseData = [
  {price:100,img:"foto0.png"},
  {price:120,img: "foto1.png"},
  {price:130,img:"foto2.png"},
  {price:1000,img:"foto3.png"}]

import React, { Component } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  ActivityIndicator,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/colors";
import Draw from "../components/game/draw" ;
import Write from "../components/game/write";
import IniWrite from "../components/game/initialWrite";
import APIKit from "../util/APIKit";
import URI from "../constants/apiUris"
import Wait from "../components/game/wait";

const initState = { partida: "", mode: 1 ,isLoading: true};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
    flexDirection: "column",
  },
  upLeftContainer: {
    paddingLeft: "5%",
    paddingTop: "3%",
    flexDirection: "row",
    paddingBottom: "5%",
  },
  return: {},
  lobbyText: {
    fontSize: 20,
    fontWeight: "bold",
    left: "30%",
  },
  gamezone: {
    height: "73%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "baseline",
  },
});

class TurnScreen extends Component {
  constructor() {
    super();
    this.state = initState;
    AsyncStorage.getItem("@partidaName", (err, item) => {
    this.state.partida= item ;
    console.log("Partida: " + this.state.partida);
    });
  }

checkTurn(){
    const onSuccess = ({ data }) => {
      console.log("Recibo turno" +  JSON.stringify(data));
     //seleccionar componente a mostrar
     if(data.id_==-1){
       //Primer turno
       console.log("Primer turno")
       this.setState({mode:0})
     }
     else if(data.id_==-2){
       //Esperar siguiente turno
       console.log("esperar siguiente turno")
       this.setState({mode:1})
     }
     else{
       if(data.Dibujo){
        this.setState({mode:2})
          //turno escribir

        console.log("turno escribir")
       }else{
        this.setState({mode:3})
        //turno dibujar
        console.log("turno dibujar")
       
     }
     this.setState({ isLoading: false });
    }}

    const onFailure = (error) => {
      console.log("Ha fallado")
      this.setState({ isLoading: false });
     
     // console.log(error && error.response);
    };

    this.setState({ isLoading: true });

    APIKit.get(URI.getTurn).then(onSuccess).catch(onFailure);
}

  componentDidMount(){
   // comprobar turno
  this.checkTurn();
  }

  renderLoading(){
    return <ActivityIndicator size="large" color={Colors.white} />
  }

  renderMode(){
      console.log(this.state.mode)
            switch (this.state.mode) {
              case 0:
                return <IniWrite/>
                break;
                case 1:
                return <Wait/>
                break;
                case 2:
               return <Write/>
                break;
                case 3:
                return <Draw/>
                break;
              default:
               return <Text>k verga hago aki</Text>
                break;
            }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upLeftContainer}>
          <TouchableOpacity
            style={styles.return}
            onPress={() => this.props.navigation.navigate("Game")}
          >
            <Fontisto name="arrow-return-left" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.lobbyText}>Turn from: {this.state.partida}</Text>
        </View>
        <View style={styles.gamezone}>
          {
            this.isLoading?this.renderLoading():this.renderMode()
            
          }
        </View>
      </View>
    );
  }
}

export default TurnScreen;

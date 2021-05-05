import React, {Component} from "react";
import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
import APIKit, { setClientToken, setClientMail } from "../util/APIKit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Hilo from "../components/hilos/hilo";


const FalseData = [
    {
      "id_": 186,
      "respuestas_": [
        {
          "id_": 191,
          "autor_": {
            "mail": "A@.",
            "nombre": "A",
            "password": null,
            "token": null,
            "role": "USER",
            "fotPerf": "foto0.png",
            "estrellas": 0,
            "monedas": 0,
            "pDibujo": 0,
            "pListo": 0,
            "pGracioso": 0,
            "nAmigos": 2,
            "amigo": null,
            "peticion": null,
            "partidas": null,
            "partidasHost": null,
            "respuestas": null
          },
          "dibujo": null,
          "esDibujo": false,
          "frase": "inicialA"
        },
        {
          "id_": 193,
          "autor_": {
            "mail": "B@.",
            "nombre": "B",
            "password": null,
            "token": null,
            "role": "USER",
            "fotPerf": "foto0.png",
            "estrellas": 0,
            "monedas": 0,
            "pDibujo": 0,
            "pListo": 0,
            "pGracioso": 0,
            "nAmigos": 1,
            "amigo": null,
            "peticion": null,
            "partidas": null,
            "partidasHost": null,
            "respuestas": null
          },
          "dibujo": null,
          "esDibujo": true,
          "frase": null
        },
        {
          "id_": 197,
          "autor_": {
            "mail": "C@.",
            "nombre": "C",
            "password": null,
            "token": null,
            "role": "USER",
            "fotPerf": "foto0.png",
            "estrellas": 0,
            "monedas": 0,
            "pDibujo": 0,
            "pListo": 0,
            "pGracioso": 0,
            "nAmigos": 1,
            "amigo": null,
            "peticion": null,
            "partidas": null,
            "partidasHost": null,
            "respuestas": null
          },
          "dibujo": null,
          "esDibujo": false,
          "frase": "FINALC"
        }
      ],
      "jugadorInicial_": null,
      "partida_": null,
      "size": 3,
      "jugadorInicial": "Pepe"
    },
    {
      "id_": 187,
      "respuestas_": [
        {
          "id_": 189,
          "autor_": {
            "mail": "C@.",
            "nombre": "C",
            "password": null,
            "token": null,
            "role": "USER",
            "fotPerf": "foto0.png",
            "estrellas": 0,
            "monedas": 0,
            "pDibujo": 0,
            "pListo": 0,
            "pGracioso": 0,
            "nAmigos": 1,
            "amigo": null,
            "peticion": null,
            "partidas": null,
            "partidasHost": null,
            "respuestas": null
          },
          "dibujo": null,
          "esDibujo": false,
          "frase": "inicialC"
        },
        {
          "id_": 192,
          "autor_": {
            "mail": "A@.",
            "nombre": "A",
            "password": null,
            "token": null,
            "role": "USER",
            "fotPerf": "foto0.png",
            "estrellas": 0,
            "monedas": 0,
            "pDibujo": 0,
            "pListo": 0,
            "pGracioso": 0,
            "nAmigos": 2,
            "amigo": null,
            "peticion": null,
            "partidas": null,
            "partidasHost": null,
            "respuestas": null
          },
          "dibujo": null,
          "esDibujo": true,
          "frase": null
        },
        {
          "id_": 196,
          "autor_": {
            "mail": "B@.",
            "nombre": "B",
            "password": null,
            "token": null,
            "role": "USER",
            "fotPerf": "foto0.png",
            "estrellas": 0,
            "monedas": 0,
            "pDibujo": 0,
            "pListo": 0,
            "pGracioso": 0,
            "nAmigos": 1,
            "amigo": null,
            "peticion": null,
            "partidas": null,
            "partidasHost": null,
            "respuestas": null
          },
          "dibujo": null,
          "esDibujo": false,
          "frase": "FINALB"
        }
      ],
      "jugadorInicial_": null,
      "partida_": null,
      "size": 3,
      "jugadorInicial": "Manuel"
    },
    {
      "id_": 188,
      "respuestas_": [
        {
          "id_": 190,
          "autor_": {
            "mail": "B@.",
            "nombre": "B",
            "password": null,
            "token": null,
            "role": "USER",
            "fotPerf": "foto0.png",
            "estrellas": 0,
            "monedas": 0,
            "pDibujo": 0,
            "pListo": 0,
            "pGracioso": 0,
            "nAmigos": 1,
            "amigo": null,
            "peticion": null,
            "partidas": null,
            "partidasHost": null,
            "respuestas": null
          },
          "dibujo": null,
          "esDibujo": false,
          "frase": "inicialB"
        },
        {
          "id_": 194,
          "autor_": {
            "mail": "C@.",
            "nombre": "C",
            "password": null,
            "token": null,
            "role": "USER",
            "fotPerf": "foto0.png",
            "estrellas": 0,
            "monedas": 0,
            "pDibujo": 0,
            "pListo": 0,
            "pGracioso": 0,
            "nAmigos": 1,
            "amigo": null,
            "peticion": null,
            "partidas": null,
            "partidasHost": null,
            "respuestas": null
          },
          "dibujo": null,
          "esDibujo": true,
          "frase": null
        },
        {
          "id_": 195,
          "autor_": {
            "mail": "A@.",
            "nombre": "A",
            "password": null,
            "token": null,
            "role": "USER",
            "fotPerf": "foto0.png",
            "estrellas": 0,
            "monedas": 0,
            "pDibujo": 0,
            "pListo": 0,
            "pGracioso": 0,
            "nAmigos": 2,
            "amigo": null,
            "peticion": null,
            "partidas": null,
            "partidasHost": null,
            "respuestas": null
          },
          "dibujo": null,
          "esDibujo": false,
          "frase": "FINALA"
        }
      ],
      "jugadorInicial_": null,
      "partida_": null,
      "size": 3,
      "jugadorInicial": "Maria"
    }
  ]





class HilosScreen extends Component {


    constructor(){
        super()
        this.numHilo=0
        this.hilos=FalseData
        this.state= {hiloAhora:this.hilos[0]}
        console.log(this.state)
        
    }
    

    anteriorHilo(){
        

        if(this.numHilo>0){
            this.numHilo--;
            this.setState({hiloAhora:this.hilos[this.numHilo]})
        console.log("Pasamos al hilo "+this.numHilo)
        }
        
   
    } 

    siguienteHilo(){
    
        if(this.numHilo<this.hilos.length-1){
            this.numHilo++;
            this.setState({hiloAhora:this.hilos[this.numHilo]})
        console.log("Pasamos al hilo "+this.numHilo)
       
        
        }
        
   
    } 

    render(){
       
        return (
            <SafeAreaView style={styles.container}>
                 <Button title={"Anterior hilo"} onPress={()=> this.anteriorHilo()}></Button>
             <Hilo hilo={this.state.hiloAhora.respuestas_} jugadorInicial={this.state.hiloAhora.jugadorInicial} />
             <Button title={"Siguiente hilo"} onPress={()=> this.siguienteHilo()}></Button>
            </SafeAreaView>
     );}
 
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    flex: 1,
  },
});

export default HilosScreen;

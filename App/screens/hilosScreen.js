import React, {Component} from "react";
import { SafeAreaView, StyleSheet, View,Text, Button,TouchableOpacity } from "react-native";
import APIKit, { setClientToken, setClientMail } from "../util/APIKit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Hilo from "../components/hilos/hilo";
import { Fontisto } from "@expo/vector-icons";
import URI from "../constants/apiUris"








class HilosScreen extends Component {


    constructor(){
        super()
        this.numHilo=0
        this.hilos=[]
        this.state= {hiloAhora: []}
     

       
        
        
    }
    componentDidMount(){
        this.loadData()
    }

    loadData =  async () =>  {
        const onSuccess = ({ data }) => {
            
            this.hilos=data
            this.setState({hiloAhora:this.hilos[0]})
            console.log(this.state.hiloAhora)

          
          }
      
          const onFailure = (error) => {
            console.log("Ha falladooooooooo")
            
           
            console.log(error);
          };
      
       
      
          APIKit.get(URI.getHilos).then(onSuccess).catch(onFailure);

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
                <View style={styles.hilos}>
                <Button title={"Anterior hilo"} onPress={()=> this.anteriorHilo()}></Button>
            <Hilo hilo={this.state.hiloAhora.respuestas_} jugadorInicial={this.state.hiloAhora.jugadorInicial_} />
            <Button title={"Siguiente hilo"} onPress={()=> this.siguienteHilo()}></Button>
           </View>
                
              }
            </View>
          </View>


            
     );}
 
};

const styles = StyleSheet.create({
  hilos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
    flex: 1,
  },
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

export default HilosScreen;

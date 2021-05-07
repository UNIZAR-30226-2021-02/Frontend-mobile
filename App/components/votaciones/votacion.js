import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View,Image,TouchableOpacity } from "react-native";
import { RowSeparator } from "../RowItem";
import globalStyles from "../../constants/styles";
import Grid from 'react-native-grid-component';
import URI from "../../constants/apiUris"
import APIKit from "../../util/APIKit"


class Votacion extends Component {

    constructor(){
        
        super();
        this.state={mode:0,players:[],voteTitle:"mejor dibujante"}
        this.mode=0;
     
        
    }

    componentDidMount(){
      this.loadData()
    }

    loadData(){

      const onSuccess = ({ data }) => {
        //console.log(data)
     
        this.setState({players: data});
        
   
      }
  
      const onFailure = (error) => {
        console.log("Ha falladooooooooo")
        
       
        console.log(error);
      };
  
   
  
      APIKit.get(URI.listPlayers).then(onSuccess).catch(onFailure);
    }

    mandarVoto(usr,kind){

      const payload = JSON.stringify({ usr:usr});

      const onSuccess = ({ data }) => {


      
     
        this.setState({players: data});
        
   
      }
  
      const onFailure = (error) => {
        console.log("Ha falladooooooooo")
        
       
        console.log(error);
      };
  
   
  
     
      //APIKit.post(kind, payload).then(onSuccess).catch(onFailure);



    }

    votar(usr){

      switch (this.mode) {
        case 0: //mejor dibujo
        console.log("dibujante "+usr)
        this.mandarVoto(usr,URI.voteDibujante)
        this.setState({voteTitle:"más inteligente"})
        break;

        case 1://más inteligente
        console.log("clever "+usr)
        this.mandarVoto(usr,URI.voteListo)
        this.setState({voteTitle:"más gracioso"})
        break;

        case 2://más divertido
        console.log("diver "+usr)
        this.mandarVoto(usr,URI.voteGracioso)
        
        //ir a resultados
        break;

        default:
          console.log("no debo estar aki")

        break;
      }
      this.mode++;
      
    }

    _renderItem = (item, i) => (
        <View style={[ styles.item]} key={i} >
          <TouchableOpacity onPress={()=>this.votar(item.mail)}>
        <Image
            source={{
              uri:  URI.img+item.fotPerf,
            }}
            style={styles.picture}
          />
          <Text>{item.nombre}</Text>
          </TouchableOpacity>
          </View>
      );

      renderPlaceholder = i => <View style={{ backgroundColor: "red" },styles.item} key={i}><Text>María</Text> </View> ;
    render(){
      
        return (
          <View style={styles.container}>
          <Text>{"Vota al "+this.state.voteTitle}</Text>
            <Grid
              style={styles.list}
              keyExtractor={(item) => String(item)} //TODO
              renderItem={this._renderItem}
              renderPlaceholder={this._renderPlaceholder}
              data={this.state.players}
              numColumns={5}
            />
            </View>
          );
    }

}

const styles = StyleSheet.create({
    item: {
      width:100,
      height: 100,
      margin: 10,
      alignItems:"center",
      justifyContent:"center",

    },
    list: {
      width:600,
      height: 120,
    },
    container:{
      alignItems:"center",
      justifyContent:"center",
      
    },
    picture: { width: 40, height: 40 },
 
  });
export default Votacion;
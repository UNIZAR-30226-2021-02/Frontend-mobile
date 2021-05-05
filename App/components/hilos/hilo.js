import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {TextHiloItem,ImgHiloItem} from "./HiloItem"
import { RowSeparator } from "../RowItem";
import globalStyles from "../../constants/styles";



const initState = { };




class Hilo extends Component {

    constructor() {
        super();
        this.state = initState;
      }
      


     

      renderItem = ({ item }) => {
        if(item.esDibujo){
          return ( 
          <View>
            <ImgHiloItem name={item.autor_.nombre} img={item.autor_.fotPerf} answer={item.frase}/>
          </View>);
        }
        else 
        {
            return ( 
                <View>
                  <TextHiloItem name={item.autor_.nombre} img={item.autor_.fotPerf} answer={item.frase}/>
                </View>);
        }
      };

      render(){
        return ( 
        <View       style={{height:300}}> 
       
            <FlatList 
           
            data={this.props.hilo}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id_.toString()} //TODO
            ItemSeparatorComponent={RowSeparator}
            ListEmptyComponent={
              <Text style={globalStyles.owoFont}>xd</Text>
            }
            ListHeaderComponent={
              <Text style={globalStyles.papuFont}>Hilo de {this.props.jugadorInicial}</Text>
            }
          />
        </View>);
      }


}


export default Hilo;
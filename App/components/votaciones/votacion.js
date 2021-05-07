import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View,Image,TouchableOpacity } from "react-native";
import { RowSeparator } from "../RowItem";
import globalStyles from "../../constants/styles";
import Grid from 'react-native-grid-component';
import URI from "../../constants/apiUris"


class Votacion extends Component {

    constructor(){
        super();
    }

    _renderItem = (data, i) => (
        <View style={[ styles.item]} key={i} >
          <TouchableOpacity>
        <Image
            source={{
              uri:  URI.img+"foto0.png",
            }}
            style={styles.picture}
          />
          <Text>María</Text>
          </TouchableOpacity>
          </View>
      );

      renderPlaceholder = i => <View style={{ backgroundColor: "red" },styles.item} key={i}><Text>María</Text> </View> ;
    render(){
        return (
          <View style={styles.container}>
          <Text>Mejor sapo</Text>
            <Grid
              style={styles.list}
              keyExtractor={(item) => String(item)} //TODO
              renderItem={this._renderItem}
              renderPlaceholder={this._renderPlaceholder}
              data={['black', 'white', 'red', 'pink', 'blue','blue', ]}
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
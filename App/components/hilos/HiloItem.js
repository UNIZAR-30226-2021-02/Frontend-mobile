import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import URI from "../../constants/apiUris"

export const TextHiloItem = ({ name,img,answer  }) => {

    return (
        <View style={styles.row}>
          <View>
            <Image
              source={{
              uri:URI.img+ img,
             }}
            style={styles.picture}
        />
         <Text>{name}</Text>
      </View>
          
          <Text>{answer}</Text>
          
        </View>
      );
  };

  export const ImgHiloItem = ({ name,img,answer  }) => {
    console.log("http://10.0.2.2:8080/api/returnImageResponse/"+answer)
   
    return (
      <View style={styles.row}>
          <View>
            <Image
              source={{
              uri:URI.img+ img,
             }}
            style={styles.picture}
        />
         <Text>{name}</Text>
      </View>
          
      <Image
              source={{
              uri:"http://10.0.2.2:8080/api/returnImageResponse/"+answer,
              //uri:URI.img+ img,
             }}
            style={styles.imgResponse}
        />
          
        </View>
    );
  };


  const styles = StyleSheet.create({
    row: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
     
     
    
  
    },
    picture:
    {
      height:40,
      width:40,
    },

    imgResponse:
    {
      height:200,
      width:200,
    }
  
  });
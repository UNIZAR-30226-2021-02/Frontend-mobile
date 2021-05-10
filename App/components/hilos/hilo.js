import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TextHiloItem, ImgHiloItem } from "./HiloItem";
import { RowSeparatorThin } from "../RowItem";
import globalStyles from "../../constants/styles";
import Colors from "../../constants/colors";

const initState = {};

class Hilo extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  renderItem = ({ item }) => {
    if (item.esDibujo) {
      return (
        <View>
          <ImgHiloItem
            name={item.autor_.nombre}
            img={item.autor_.fotPerf}
            answer={item.id_}
          />
        </View>
      );
    } else {
      return (
        <View>
          <TextHiloItem
            name={item.autor_.nombre}
            img={item.autor_.fotPerf}
            answer={item.frase}
          />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.hilo}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id_.toString()} //TODO
          ItemSeparatorComponent={RowSeparatorThin}
          ListEmptyComponent={<Text style={globalStyles.owoFont}>xd</Text>}
          ListHeaderComponent={
            <Text style={globalStyles.papuFont}>
              Hilo de
              {
                //TODO
                //this.props.jugadorInicial
              }
            </Text>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: Colors.background,
  },
});

export default Hilo;

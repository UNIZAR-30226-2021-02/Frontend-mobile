import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RowSeparator, RowItem } from "./RowItem";

const initState = { loading: false };

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const renderItem = ({ item }) => (
  <View>
    <RowItem
      title={item.name}
      onPress={() => console.log("hli")}
      picture={"../assets/images/monstruo.png"}
    ></RowItem>
  </View>
);

class ListaAmigos extends Component {
  constructor() {
    super();
    this.state = initState;
    //this.loadData();
  }
  //función que pide la lista de amigos a la API
  loadData = () => {
    //this.state.loading = true

    this.setState({
      data: [
        { name: "siegfried" },
        { name: "pepo" },
        { name: "pepe" },
        { name: "pepi" },
      ],
    });
  };
  state = {};
  render() {
    this.loadData();
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.name} //TODO
          ItemSeparatorComponent={RowSeparator}
          ListEmptyComponent={<Text>No tienes amigos owo</Text>}
          onRefresh={this.loadData}
          refreshing={this.state.loading}
          ListHeaderComponent={<Text>Ranking papu</Text>}
        />
      </View>
    );
  }
}
export default ListaAmigos;

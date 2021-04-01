import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RowSeparator, RankingItem } from "./RowItem";
import APIKit from "../util/APIKit";

const initState = { loading: false };

const renderItem = ({ item, index }) => (
  <View>
    <Text>{index + 1}</Text>
    <RankingItem
      name={item.nombre}
      onPress={() => console.log("hli")}
      picture={"../assets/images/monstruo.png"}
    ></RankingItem>
  </View>
);

class ListaAmigos extends Component {
  constructor() {
    super();
    this.state = initState;
    this.loadData();
  }

  componentDidMount = () => {
    this.loadData();
  };
  //función que pide la lista de amigos a la API

  loadData = () => {
    this.setState({ isLoading: true });
    const onSuccess = ({ data }) => {
      console.log("Nos devuelve los amigos: " + JSON.stringify(data));
      this.setState({
        data: data,
      });
      this.setState({ isLoading: false });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };
    this.setState({ isLoading: true });
    APIKit.get("/listFriends").then(onSuccess).catch(onFailure);
  };
  state = {};
  render() {
    //this.loadData();
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.nombre} //TODO
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

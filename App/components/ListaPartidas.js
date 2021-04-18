import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RowSeparator, GameItem } from "./RowItem";
import APIKit, { setGameId } from "../util/APIKit";
import URI from "../constants/apiUris";
const initState = { loading: false, data: [] };

class ListaPartidas extends Component {
  constructor() {
    super();
    this.state = initState;
    this.state.data = this.loadData();
  }

  renderItem = ({ item, index }) => (
    <View>
      <GameItem
        name={item.nombre}
        onPressPlay={() => {
          AsyncStorage.setItem("@partidaName", item.nombre);
          setGameId(item.id);
          if (item.estado_ == "esperando") {
            this.props.action();
          } else {
            this.props.action2();
          }
        }}
      ></GameItem>
    </View>
  );

  //función que pide la lista de amigos a la API
  loadData = () => {
    this.setState({ loading: true });

    const onSuccess = ({ data }) => {
      console.log("Nos devuelve las peticiones: " + JSON.stringify(data));
      this.setState({
        data: data,
      });
      this.setState({ loading: false });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, loading: false });
    };
    this.setState({ loading: true });
    APIKit.get(URI.listGames).then(onSuccess).catch(onFailure);
  };

  state = {};
  render() {
    //this.loadData();
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.nombre} //TODO
          ItemSeparatorComponent={RowSeparator}
          ListEmptyComponent={<Text>No tienes partidas owo</Text>}
          onRefresh={this.loadData}
          refreshing={this.state.loading}
          ListHeaderComponent={<Text>Partidas papu</Text>}
        />
      </View>
    );
  }
}
export default ListaPartidas;

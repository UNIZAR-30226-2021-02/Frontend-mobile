import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RowSeparator, GameItem } from "./RowItem";
import APIKit from "../util/APIKit";
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
          const payload = JSON.stringify({ nombre: item.nombre });
          console.log("Se envía " + payload);

          const onSuccess = ({ data }) => {
            console.log("Entramos a la partida :3 " + data);
          };
          const onFailure = (error) => {
            console.log(error && error.response);
          };

          APIKit.post(URI.acceptRequest, payload)
            .then(onSuccess)
            .catch(onFailure);
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
    APIKit.get(URI.listRequest).then(onSuccess).catch(onFailure);
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
          ListEmptyComponent={<Text>No tienes peticiones owo</Text>}
          onRefresh={this.loadData}
          refreshing={this.state.loading}
          ListHeaderComponent={<Text>Peticiones papu</Text>}
        />
      </View>
    );
  }
}
export default ListaPartidas;

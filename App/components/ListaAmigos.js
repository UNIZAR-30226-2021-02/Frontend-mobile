import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RowSeparator, RankingItem } from "./RowItem";
import APIKit from "../util/APIKit";
import globalStyles from "../constants/styles";

import URI from "../constants/apiUris";

const initState = { loading: true };

class ListaAmigos extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  componentDidMount = () => {
    this.loadData();
    this.setState({ loading: false });
  };

  removeFriend = (name) => {
    console.log("antes " + this.state.data);
    const newLs = this.state.data.filter((rqt) => {
      return rqt.nombre != name;
    });
    this.setState({ data: newLs });
    console.log("despues " + this.state.data);
  };

  renderItem = ({ item, index }) => (
    <View>
      <Text></Text>
      <RankingItem
        ind={index + 1}
        name={item.nombre}
        onPress={() => {
          const payload = JSON.stringify({ nombre: item.nombre });
          console.log("Se envía " + payload);

          const onSuccess = ({ data }) => {
            console.log("Eliminado manin " + data);
            this.removeFriend(item.nombre);
            this.removeRequest(item.nombre);
          };
          const onFailure = (error) => {
            console.log(error && error.response);
          };

          APIKit.post(URI.deleteFriend, payload)
            .then(onSuccess)
            .catch(onFailure);
        }}
        pts={item.estrellas}
        picture={URI.img + item.fotPerf}
      ></RankingItem>
    </View>
  );
  //función que pide la lista de amigos a la API

  loadData = () => {
    this.setState({ loading: true });
    const onSuccess = ({ data }) => {
      console.log("Nos devuelve los amigos: " + JSON.stringify(data));
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
    APIKit.get(URI.listFriends).then(onSuccess).catch(onFailure);
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
          ListEmptyComponent={<Text>No tienes amigos owo</Text>}
          onRefresh={this.loadData}
          refreshing={this.state.loading}
          ListHeaderComponent={
            <Text style={globalStyles.papuFont}>Ranking</Text>
          }
        />
      </View>
    );
  }
}
export default ListaAmigos;

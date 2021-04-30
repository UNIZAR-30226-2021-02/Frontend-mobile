import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RowSeparator, InLobbyItem } from "./RowItem";
import APIKit from "../util/APIKit";
import globalStyles from "../constants/styles";
import URI from "../constants/apiUris";

const initState = { loading: true };

class ListaInLobby extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  componentDidMount = () => {
    this.loadData();
    this.setState({ loading: false });
  };

  removePlayer = (name) => {
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
      <InLobbyItem
        name={item.nombre}
        onPress={() => {
          /*
          const payload = JSON.stringify({ nombre: item.nombre });
          console.log("Se envía " + payload);

          const onSuccess = ({ data }) => {
            console.log("Eliminado manin " + data);
            this.removePlayer(item.nombre);
            this.removeRequest(item.nombre);
          };
          const onFailure = (error) => {
            console.log(error && error.response);
          };

          APIKit.post(URI.deleteFriend, payload)
            .then(onSuccess)
            .catch(onFailure);*/
          null;
        }}
        picture={URI.img + item.fotPerf}
      ></InLobbyItem>
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
    APIKit.get(URI.listPlayers).then(onSuccess).catch(onFailure);
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
          ListEmptyComponent={
            <Text style={globalStyles.owoFont}>No nay nadie en el lobby.</Text>
          }
          onRefresh={this.loadData}
          refreshing={this.state.loading}
          ListHeaderComponent={
            <Text style={globalStyles.papuFont}>Players</Text>
          }
        />
      </View>
    );
  }
}
export default ListaInLobby;

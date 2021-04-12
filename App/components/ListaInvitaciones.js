import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RowSeparator, InviteItem } from "./RowItem";
import APIKit from "../util/APIKit";
import URI from "../constants/apiUris";
const initState = { loading: false, data: [] };

class ListaInvitaciones extends Component {
  constructor() {
    super();
    this.state = initState;
    this.state.data = this.loadData();
  }

  removeRequest = (name) => {
    console.log("antes " + this.state.data);
    const newLs = this.state.data.filter((rqt) => {
      return rqt.nombre != name;
    });
    this.setState({ data: newLs });
    console.log("despues " + this.state.data);
  };

  renderItem = ({ item, index }) => (
    <View>
      <InviteItem
        name={item.nombre}
        onPressAccept={() => {
          const payload = JSON.stringify({ nombre: item.nombre });
          console.log("Se envía " + payload);

          const onSuccess = ({ data }) => {
            console.log("Aceptado manin " + data);
            this.removeRequest(item.nombre);
          };
          const onFailure = (error) => {
            console.log(error && error.response);
          };

          APIKit.post(URI.acceptRequest, payload)
            .then(onSuccess)
            .catch(onFailure);
        }}
        onPressReject={() => {
          const payload = JSON.stringify({ nombre: item.nombre });
          console.log("Se envía " + payload);

          const onSuccess = ({ data }) => {
            console.log("Rechazado manin " + data);
            this.removeRequest(item.nombre);
          };
          const onFailure = (error) => {
            console.log(error && error.response);
          };

          APIKit.post(URI.denyRequest, payload)
            .then(onSuccess)
            .catch(onFailure);
        }}
      ></InviteItem>
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
    APIKit.get(URI.listInvites).then(onSuccess).catch(onFailure);
  };
  state = {};
  render() {
    //this.loadData();
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.nombre}
          ItemSeparatorComponent={RowSeparator}
          ListEmptyComponent={<Text>No tienes invitaciones</Text>}
          onRefresh={this.loadData}
          refreshing={this.state.loading}
          ListHeaderComponent={<Text>Invitaciones</Text>}
        />
      </View>
    );
  }
}
export default ListaInvitaciones;

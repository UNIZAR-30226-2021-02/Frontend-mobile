import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RowSeparator, RequestItem } from "./RowItem";
import APIKit from "../util/APIKit";

const initState = { loading: false, data: "" };

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

class ListaPetis extends Component {
  constructor() {
    super();
    this.state = initState;
    this.state.data = this.loadData();
    //this.loadData();
  }

  renderItem = ({ item, index }) => (
    <View>
      <RequestItem
        name={item.nombre}
        onPressAdd={() => {
          const payload = JSON.stringify({ nombre: item.nombre });
          console.log("Se envía " + payload);

          const onSuccess = ({ data }) => {
            console.log("Aceptado manin " + data);
            this.setState({ isLoading: false });
          };
          const onFailure = (error) => {
            console.log(error && error.response);
            this.setState({ errors: error.response.data, isLoading: false });
          };

          this.setState({ isLoading: true });
          APIKit.post("/acceptRequest", payload)
            .then(onSuccess)
            .catch(onFailure);
        }}
        onPressReject={() => {
          const payload = JSON.stringify({ nombre: item.nombre });
          console.log("Se envía " + payload);

          const onSuccess = ({ data }) => {
            console.log("Rechazado manin " + data);
            this.setState({ loading: false });
          };
          const onFailure = (error) => {
            console.log(error && error.response);
            this.setState({ errors: error.response.data, loading: false });
          };

          this.setState({ loading: true });
          APIKit.post("/denyRequest", payload).then(onSuccess).catch(onFailure);
        }}
        picture={"../assets/images/monstruo.png"}
      ></RequestItem>
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
    APIKit.get("/listRequest").then(onSuccess).catch(onFailure);
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
export default ListaPetis;

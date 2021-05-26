import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  ToastAndroid,
} from "react-native";
import { RowSeparator, InviteFriendItem } from "./RowItem";
import APIKit, { setInviteName } from "../util/APIKit";
import globalStyles from "../constants/styles";
import URI from "../constants/apiUris";

const initState = { loading: true };

class ListaInLobbyAdd extends Component {
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
    <InviteFriendItem
      name={item.nombre}
      onPress={() => {
        setInviteName(item.mail);

        const onSuccess = ({ data }) => {
          console.log("Eliminado manin " + data);
          ToastAndroid.show(
            "Enviada la invitación a: " + item.nombre,
            ToastAndroid.SHORT
          );
        };
        const onFailure = (error) => {
          console.log(error && error.response);
          if (error.message == "Request failed with status code 417") {
            Alert.alert("Error: El usuario ya está invitado.");
          }
        };

        APIKit.get(URI.inviteGame).then(onSuccess).catch(onFailure);
      }}
      picture={URI.img + item.fotPerf}
    ></InviteFriendItem>
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
    APIKit.get(URI.listFriendsGame).then(onSuccess).catch(onFailure);
  };
  state = {};
  render() {
    //this.loadData();
    return (
      <View style={{ bottom: "3%" }}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.nombre} //TODO
          ItemSeparatorComponent={RowSeparator}
          ListEmptyComponent={
            <Text style={globalStyles.owoFont}>No tienes más amigos.</Text>
          }
          onRefresh={this.loadData}
          refreshing={this.state.loading}
          ListHeaderComponent={
            <Text style={globalStyles.papuFont}>Amigos</Text>
          }
        />
      </View>
    );
  }
}
export default ListaInLobbyAdd;

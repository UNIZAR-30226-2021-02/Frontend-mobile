import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PuntuacionItem } from "./PuntuacionItem";
import { RowSeparatorThin } from "../RowItem";
import globalStyles from "../../constants/styles";
import Colors from "../../constants/colors";
import URI from "../../constants/apiUris";
import APIKit from "../../util/APIKit";

const initState = {};

class Puntuaciones extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  componentDidMount() {
    this.loadData();
  }

  renderItem = ({ item }) => {
    return (
      <PuntuacionItem
        name={item.idUsuario_.nombre}
        img={item.idUsuario_.fotPerf}
        pD={item.pDibujo_}
        pG={item.pGracioso_}
        pL={item.pListo_}
      />
    );
  };

  loadData = () => {
    this.setState({ loading: true });
    const onSuccess = ({ data }) => {
      this.setState({
        data: data,
      });
      this.setState({ loading: false });
    };
    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, loading: false });
    };

    APIKit.get(URI.verResultados).then(onSuccess).catch(onFailure);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item} //TODO
          ItemSeparatorComponent={RowSeparatorThin}
          ListEmptyComponent={<Text style={globalStyles.owoFont}>No hay</Text>}
          ListHeaderComponent={
            <Text style={globalStyles.papuFont}>Jugadores: </Text>
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
    left: "10%",
    bottom: "3%",
  },
});

export default Puntuaciones;

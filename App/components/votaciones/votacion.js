import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import { RowSeparator } from "../RowItem";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import globalStyles from "../../constants/styles";
import Grid from "react-native-grid-component";
import URI from "../../constants/apiUris";
import APIKit, { setVoteName } from "../../util/APIKit";
const screen = Dimensions.get("window");

const Iconos = (props) => {
  const { name } = props;
  if (name == 1) {
    return (
      <FontAwesome
        style={{ left: "25%", top: "0.5%" }}
        name="pencil"
        size={18}
        color="white"
      />
    );
  }
  if (name == 2) {
    return (
      <MaterialCommunityIcons
        style={{ left: "24%", top: "0.7%" }}
        name="brain"
        size={18}
        color="white"
      />
    );
  }

  console.log(name);
  return (
    <Ionicons
      style={{ left: "24%", top: "0.5%" }}
      name="md-happy-outline"
      size={18}
      color="white"
    />
  );
};
class Votacion extends Component {
  constructor() {
    super();
    this.state = {
      mode: 0,
      players: [],
      voteTitle: "mejor dibujante",
      abc: 1,
    };
    this.mode = 0;
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const onSuccess = ({ data }) => {
      this.setState({ players: data });
    };
    const onFailure = (error) => {
      console.log("Ha falladooooooooo");
      console.log(error);
    };
    APIKit.get(URI.listPlayers).then(onSuccess).catch(onFailure);
  }

  mandarVoto(usr, kind) {
    setVoteName(usr);

    const onSuccess = ({ data }) => {
      console.log("Hola " + data);
    };

    const onFailure = (error) => {
      console.log("Ha falladooooooooo");
      console.log(error);
    };

    APIKit.get(kind).then(onSuccess).catch(onFailure);
  }

  resetVoto() {
    const onSuccess = ({ data }) => {
      console.log("Hola" + data);
    };

    const onFailure = (error) => {
      console.log("Ha falladooooooooo");
      console.log(error);
    };

    APIKit.get(URI.resetVotos).then(onSuccess).catch(onFailure);
  }

  votar(usr) {
    switch (this.mode) {
      case 0: //mejor dibujo
        console.log("dibujante " + usr);
        this.mandarVoto(usr, URI.voteDibujante);
        this.setState({ voteTitle: "más inteligente", abc: 2 });
        break;

      case 1: //más inteligente
        console.log("clever " + usr);
        this.mandarVoto(usr, URI.voteListo);
        this.setState({ voteTitle: "más gracioso", abc: 3 });
        break;

      case 2: //más divertido
        console.log("diver " + usr);
        this.mandarVoto(usr, URI.voteGracioso);
        //ir a resultados
        break;

      default:
        console.log("no debo estar aki");
        break;
    }
    this.mode++;
  }

  _renderItem = (item, i) => (
    <View style={[styles.item]} key={i}>
      <TouchableOpacity onPress={() => this.votar(item.mail)}>
        <Image
          source={{
            uri: URI.img + item.fotPerf,
          }}
          style={styles.picture}
        />
        <View
          style={{
            top: "2%",
            right: "3%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={styles.nombre}>{item.nombre}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  renderPlaceholder = (i) => (
    <View style={({ backgroundColor: "red" }, styles.item)} key={i}>
      <Text>María</Text>
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.conImg}>
          <Text style={styles.votaAl}>{"Vota al " + this.state.voteTitle}</Text>
          <Iconos name={this.state.abc} />
          <Button title="OWO" onPress={() => this.resetVoto()} />
        </View>
        <View style={styles.back} />
        <Grid
          style={styles.list}
          keyExtractor={(item) => String(item)} //TODO
          renderItem={this._renderItem}
          renderPlaceholder={this._renderPlaceholder}
          data={this.state.players}
          numColumns={5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    position: "absolute",
    borderRadius: 20,
    backgroundColor: "white",
    width: screen.width * 0.8,
    height: screen.height * 0.63,
    bottom: screen.height * 0.61,
  },
  list: {
    borderRadius: 20,
    width: screen.width * 0.8,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    right: "9.9%",
  },
  picture: { width: 48, height: 48 },
  votaAl: {
    fontWeight: "bold",
    color: "white",
    fontSize: 19,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 18,
    bottom: 4,
  },
  conImg: {
    bottom: "4%",
    flexDirection: "row",
  },
});
export default Votacion;

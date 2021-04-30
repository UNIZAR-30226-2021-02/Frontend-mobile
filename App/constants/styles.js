import Colors from "./colors";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  background: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
  },
  papuFont: {
    paddingTop: 10,
    paddingBottom: 4,
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  owoFont: {
    fontSize: 15,
    color: "white",
  },
  toggleButton: {
    borderRadius: 5,
    width: 220,
    height: 40,
    backgroundColor: "rgba(102, 102, 102, 0.4)",
    marginLeft: 40,
    marginRight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleSelectedButton: {
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 2,
    width: 220,
    height: 40,
    backgroundColor: "rgba(102, 102, 102, 1)",
    marginLeft: 40,
    marginRight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleFont: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});

export default globalStyles;

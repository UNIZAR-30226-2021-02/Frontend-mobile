import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Dimensions,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../constants/colors";
const screen = Dimensions.get("window");
class Tab extends React.PureComponent {
  render() {
    const { isSelected, tabIcon, tabName, onPress } = this.props;
    const color = !isSelected ? "#EEE" : Colors.background;
    const textStyles = {
      color,
      fontSize: 32,
      fontWeight: isSelected ? "bold" : "normal",
    };
    const containerStyles = {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#EEE",
      padding: 12,
    };
    return (
      <TouchableOpacity style={containerStyles} onPress={onPress}>
        <MaterialIcons
          style={styles.left}
          name={tabIcon}
          size={30}
          color={Colors.background}
        />
        <MaterialIcons
          style={styles.lessleft}
          name="arrow-left"
          size={50}
          color={color}
        />
      </TouchableOpacity>
    );
  }
}

class LeftTabs extends React.PureComponent {
  render() {
    const { tabs, selectedTab, onTabPressed, width } = this.props;
    return (
      <SafeAreaView style={[styles.box, { width }]}>
        {tabs.map(({ tabName, tabIcon }) => {
          return (
            <Tab
              onPress={() => {
                onTabPressed(tabName);
                selectedTab;
                console.log(tabName + " " + selectedTab);
              }}
              key={tabName}
              tabName={tabName}
              tabIcon={tabIcon}
              isSelected={selectedTab === tabName}
            />
          );
        })}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    flex: -1,
    minWidth: 70,
    backgroundColor: "#eee",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  left: {
    left: "49%",
  },
  lessleft: {
    left: screen.width * 0.023,
  },
  moreleft: {
    left: screen.width * 0.027,
  },
});
export default LeftTabs;

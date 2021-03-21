import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

class Tab extends React.PureComponent {
  render() {
    const { isSelected, tabIcon, tabName, onPress } = this.props;
    const color = isSelected ? "#EEE" : "blue";
    const textStyles = {
      color,
      fontSize: 32,
      fontWeight: isSelected ? "bold" : "normal",
    };
    const containerStyles = {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isSelected ? "blue" : "#EEE",
      padding: 12,
    };
    return (
      <TouchableOpacity style={containerStyles} onPress={onPress}>
        <AntDesign
          name={tabIcon}
          size={25}
          color={color}
          //style={{ width: 66, textAlign: "center" }}
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
              onPress={() => onTabPressed(tabName)}
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
});
export default LeftTabs;

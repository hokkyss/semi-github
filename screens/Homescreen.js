import React from "react";
import { Dimensions, StyleSheet, Text, View, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const deviceScale = Dimensions.get("window").scale;

function HomeScreen(props) {
  const navigation = useNavigation();

  const toSearchScreen = () => {
    navigation.navigate("Home Screen");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.navbar]}>
        <Text style={styles.text}>POKéDEX</Text>
        <Icon.Button
          name="search"
          backgroundColor={colors.normalNavbar}
          onPress={toSearchScreen}
        ></Icon.Button>
      </View>
      <View style={styles.contentBox}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: colors.back,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: "2%",
  },
  contentBox: {
    height: "93%",
    padding: "1.25%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  navbar: {
    backgroundColor: colors.normalNavbar,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "3%",
    paddingRight: "2%",
    alignItems: "center",
    width: "100%",
    height: "7%",
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default HomeScreen;

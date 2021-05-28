import { StyleSheet, StatusBar, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const deviceScale = Dimensions.get("window").scale;

const globalStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  contentBox: {
    backgroundColor: "white",
    height: "100%",
    padding: "1.25%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputText: {
    height: deviceHeight * 0.05,
    width: "90%",
    paddingLeft: "4%",
    paddingRight: "4%",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 19,
  },
  navbar: {
    backgroundColor: "#22272e",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "3%",
    paddingRight: "2%",
    alignItems: "center",
    width: "100%",
    height: deviceHeight * 0.07,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default globalStyles;

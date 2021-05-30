import React from "react";
import { StyleSheet, View } from "react-native";

import { globalStyles } from "./../GlobalConfig";

function Navbar(props) {
  return <View style={[globalStyles.navbar]}>{props.children}</View>;
}

const styles = StyleSheet.create({});

export default Navbar;

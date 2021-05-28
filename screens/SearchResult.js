import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import globalStyles from "./../GlobalStyle";
import Navbar from "./../component/Navbar";

function SearchResult({ navigation, route }) {
  const { query, isRepo } = route.params;

  const goBack = () => navigation.goBack();

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Navbar>
        <Icon.Button
          name="chevron-left"
          backgroundColor="inherit"
          onPress={goBack}
        />
        <Text style={styles.query}>{query}</Text>
      </Navbar>
      <View style={[globalStyles.contentBox]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  query: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    left: "14%",
  },
});

export default SearchResult;

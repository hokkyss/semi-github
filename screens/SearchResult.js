import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import globalStyles from "./../GlobalStyle";
import Navbar from "./../component/Navbar";

function SearchResult({ navigation, route }) {
  const { query, isRepo } = route.params;

  const [searchResult, setSearchResult] = useState([]);

  const goBack = () => navigation.goBack();

  const url = `https://api.github.com/search/${
    isRepo ? "repositories" : "users"
  }?q=${query}`;

  useEffect(
    () =>
      fetch(url)
        .then((response) => response.json())
        .then((result) => setSearchResult(result.items))
        .catch((error) => console.log(error)),
    []
  );

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
      <View style={[globalStyles.contentBox]}>
        {searchResult.map((result) =>
          isRepo ? (
            <View style={[styles.repo]}></View>
          ) : (
            <View style={[styles.user]}></View>
          )
        )}
      </View>
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
  repo: {
    borderBottomColor: "grey",
    width: "90%",
  },
  user: {
    borderBottomColor: "grey",
  },
});

export default SearchResult;

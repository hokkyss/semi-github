import React, { useState, useEffect, useCallback } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
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

  const goToDetail = (fullname) => {
    navigation.navigate("Details", { fullname: fullname, path: "" });
  };

  const fetchContent = () => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => setSearchResult(result.items))
      .catch((error) => {
        // console.log("fetch error");
      });
    /*
    try {
      const response = await fetch(url);
      const result = await response.json();
      setSearchResult(result.items);
      console.log(searchResult);
    } catch (error) {
      console.log("fetch error");
    }*/
  };

  useEffect(() => {
    fetchContent();
    // console.log("useEffect");
  }, []);

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
      <View style={[globalStyles.contentBox, styles.contentBox]}>
        {searchResult.map((result) =>
          isRepo ? (
            <Pressable
              style={({ pressed }) => [
                styles.repo,
                {
                  backgroundColor: pressed ? "grey" : "white",
                },
              ]}
              onPress={() => {
                console.log("repo pressed");
                goToDetail(result.full_name);
              }}
            >
              <Text>{result.full_name}</Text>
            </Pressable>
          ) : (
            <View style={[styles.user]}></View>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentBox: {
    flexDirection: "column",
    backgroundColor: "blue",
  },
  query: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    left: "14%",
  },
  repo: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "90%",
  },
  user: {
    borderBottomColor: "grey",
  },
});

export default SearchResult;

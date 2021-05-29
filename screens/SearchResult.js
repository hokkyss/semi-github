import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const deviceWidth = Dimensions.get("window").width;

import globalStyles from "./../GlobalStyle";
import Navbar from "./../component/Navbar";

function SearchResult({ navigation, route }) {
  const { query, isRepo } = route.params;
  const [searchResult, setSearchResult] = useState([]);

  const goBack = () => navigation.navigate("Home Screen");

  const url = (page) =>
    `https://api.github.com/search/${
      isRepo ? "repositories" : "users"
    }?q=${query}&page=${page}&per_page=100`;

  const config = {
    method: "GET",
    headers: { authorization: "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" },
  };

  const goToDetail = (fullname) => {
    navigation.navigate("Repository Details", { fullname: fullname, path: "" });
  };

  const fetchContent = () => {
    fetch(url(1), config)
      .then((response) => response.json())
      .then((result) => {
        setSearchResult(result.items);
      })
      .catch((error) => {
        console.log("fetch error");
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

  const renderResult = ({ item, index }) => {
    return isRepo ? (
      <Pressable
        style={({ pressed }) => [
          styles.repo,
          {
            backgroundColor: pressed ? "grey" : "white",
          },
        ]}
        onPress={() => {
          console.log("repo pressed");
          goToDetail(item.full_name);
        }}
      >
        <Text>{index}</Text>
        <Text>{item.full_name}</Text>
      </Pressable>
    ) : (
      <View style={[styles.user]}></View>
    );
  };

  useEffect(() => {
    // console.log("useEffect");
    fetchContent();
    // console.log("selesai useEffect");
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
        <FlatList
          data={searchResult}
          renderItem={renderResult}
          style={styles.result}
          extraData={isRepo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentBox: {
    flexDirection: "column",
    paddingTop: 0,
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
  },
  result: {
    width: "100%",
  },
  user: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});

export default SearchResult;

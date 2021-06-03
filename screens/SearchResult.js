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

import {
  globalStyles,
  octokit,
  requestRepoSearchAlt,
  requestUserSearchAlt,
} from "./../GlobalConfig";
import Navbar from "./../component/Navbar";

function SearchResult({ navigation, route }) {
  const { query, isRepo } = route.params;
  const [searchResult, setSearchResult] = useState([]);

  const requestUserSearch = (query) => {
    var result;
    octokit
      .request(`GET /search/users`, { q: query, per_page: 100 })
      .then(({ data }) => {
        result = data.items;
      })
      .catch((error) => {});
  };

  const requestRepoSearch = (query) => {
    var result;
    octokit
      .request(`GET /search/repositories`, { q: query, per_page: 100 })
      .then(({ data }) => {
        result = data.items;
        setSearchResult(result);
      })
      .catch((error) => {});
  };

  //  const goBack = () => navigation.navigate("Home Screen");
  const goBack = () => navigation.goBack();

  const goToRepositoryDetail = (fullname) => {
    navigation.navigate("Repository Details", { fullname: fullname, path: "" });
  };

  const renderResult = ({ item }) => {
    return isRepo ? (
      <Pressable
        style={({ pressed }) => [
          styles.repo,
          {
            backgroundColor: pressed ? "grey" : "white",
          },
        ]}
        onPress={() => {
          goToRepositoryDetail(item.full_name);
        }}
      >
        <Text style={styles.repoowner}>{item.owner.login}</Text>
        <Text style={styles.reponame}>{item.name}</Text>
        <Text style={styles.repodesc} numberOfLines={3}>
          {item.description}
        </Text>
      </Pressable>
    ) : (
      <Pressable
        style={[
          styles.user,
          ({ pressed }) => {
            backgroundColor: pressed ? "blue" : "white";
          },
        ]}
        onPress={() => console.log(item.login + " pressed")}
      >
        <Text>{item.login}</Text>
      </Pressable>
    );
  };

  useEffect(() => {
    async function fetchData() {
      const res = isRepo
        ? await requestRepoSearchAlt(query)
        : await requestUserSearchAlt(query);
      setSearchResult(res);
    }
    fetchData();
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
          keyExtractor={(item) => item.node_id}
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
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  reponame: {
    color: "#0000ee",
    color: "#539bf5",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  repoowner: {
    color: "grey",
    fontSize: 15,
  },
  repodesc: {
    color: "grey",
    fontSize: 15,
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

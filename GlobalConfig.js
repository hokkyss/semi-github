import { useState } from "react";
import { StyleSheet, StatusBar, Dimensions } from "react-native";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: "",
});

// username = login
function getUserData(username) {
  var result;
  octokit
    .request(`GET /users/${username}`)
    .then(({ data }) => {
      result = { bio: data.bio, name: data.name };
    })
    .catch((error) => {
      result = undefined;
    });
  return result;
}

async function requestRepoSearchAlt(query) {
  var result;
  try {
    /*
    const { data } = await octokit.request("GET /search/repositories", {
      q: query,
      per_page: 100,
    });
    */
    const { data } = await octokit.search.repos({ q: query, per_page: 100 });
    result = data.items;
  } catch (error) {
    result = undefined;
  }
  return result;
}

async function requestUserSearchAlt(query) {
  var result;
  try {
    /*
    const { data } = await octokit.request("GET /search/users", {
      q: query,
      per_page: 100,
    });
    */
    const { data } = await octokit.search.users({ q: query, per_page: 100 });
    result = data.items;
  } catch (error) {
    result = undefined;
  }
  return result;
}

function requestContents(fullname, path) {
  octokit
    .request(`GET /repos/${fullname}/contents/${path}`)
    .then(({ data }) => {
      setResult(data);
    })
    .catch((error) => {});
  return result;
}

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
    paddingLeft: 0,
    paddingRight: 0,
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
    backgroundColor: "#0000ee",
    backgroundColor: "#539bf5",
    backgroundColor: "black",
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

export { octokit, requestRepoSearchAlt, requestUserSearchAlt, globalStyles };

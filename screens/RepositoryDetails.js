import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import globalStyles from "../GlobalStyle";
import Navbar from "../component/Navbar";

function RepositoryDetails({ navigation, route }) {
  const { fullname, path } = route.params;
  const [content, setContent] = useState("");

  const goBack = () => navigation.goBack();

  const pathList = path.split("/");

  const url = `https://api.github.com/repos/${fullname}/contents/${path}`;

  const fetchFiles = () => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => setContent(result))
      .catch((error) => {});
  };

  useEffect(() => {
    fetchFiles();
    console.log(pathList);
  }, []);

  return (
    <View style={[globalStyles.container]}>
      <Navbar>
        <Icon.Button
          name="chevron-left"
          backgroundColor="inherit"
          onPress={goBack}
        />
        <Text style={styles.repoPath}>{fullname}</Text>
      </Navbar>

      <View style={globalStyles.contentBox}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  repoPath: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    left: "14%",
  },
});

export default RepositoryDetails;
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import FIcon from "react-native-vector-icons/Feather";

import { globalStyles, octokit, requestContents } from "../GlobalConfig";
import Navbar from "./../component/Navbar";

function RepositoryDetails({ navigation, route }) {
  const { fullname, path } = route.params;
  const [content, setContent] = useState("");

  const goBack = () => navigation.goBack();
  const onFolderPress = (name) =>
    navigation.navigate("Repository Details", {
      fullname: fullname,
      path: `${path}${name}/`,
    });

  const onFilePress = (name) => {};

  const renderItem = ({ item }) => {
    return (
      <Pressable
        styles={[
          styles.fileFolder,
          ({ pressed }) => {
            backgroundColor: pressed ? "blue" : "grey";
          },
        ]}
        onPress={
          item.type === "dir"
            ? () => onFolderPress(item.name)
            : () => onFilePress(item.name)
        }
      >
        {item.type === "dir" ? (
          <FIcon.Button name="folder" backgroundColor="inherit" color="black" />
        ) : (
          <FIcon.Button name="file" backgroundColor="inherit" color="black" />
        )}
        <Text>{item.name}</Text>
      </Pressable>
    );
  };

  const pathList = path.split("/");

  useEffect(() => {
    async function fetchContents() {
      const res = await requestContents(fullname, path);
      setContent(res);
    }
    fetchContents();
  }, [path]);

  return (
    <View style={[globalStyles.container]}>
      <Navbar>
        <FAIcon.Button
          name="chevron-left"
          backgroundColor="inherit"
          onPress={goBack}
        />
        <Text style={styles.repoPath}>{fullname}</Text>
      </Navbar>
      <View style={[globalStyles.contentBox]}>
        <FlatList
          data={content}
          renderItem={renderItem}
          keyExtractor={(item) => item.sha}
        ></FlatList>
      </View>
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
  repoContent: {
    backgroundColor: "blue",
  },
  fileFolder: {
    backgroundColor: "blue",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});

export default RepositoryDetails;

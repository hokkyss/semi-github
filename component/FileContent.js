import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import ReactMarkdown from "react-markdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import globalStyles from "./../GlobalStyle";

function FileContent(props) {
  const { isReadme, url, navigation } = props;
  const [content, setContent] = useState("");

  fetch(url)
    .then((response) => response.json())
    .then((result) => setContent(result))
    .catch((error) => console.log(error));

  return (
    <View style={[globalStyles.navbar]}>
      {isReadme === true ? (
        <ReactMarkdown skipHtml={true}>{content}</ReactMarkdown>
      ) : (
        <Text>{content}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

export default FileContent;

import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import globalStyles from "../GlobalStyle";

function Details({ navigation, route }) {
  const { isReadme, fullname, path } = route.params;
  const [content, setContent] = useState("");

  fetch(url)
    .then((response) => response.json())
    .then((result) => setContent(result))
    .catch((error) => console.log(error));

  return (
    <View style={[globalStyles.navbar]}>
      {isReadme === true ? <></> : <Text>{content}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({});

export default Details;

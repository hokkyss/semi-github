import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import globalStyles from "./../GlobalStyle";
import Navbar from "./../component/Navbar";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const deviceScale = Dimensions.get("window").scale;

function HomeScreen({ navigation }) {
  const [text, setText] = useState("");
  const [isRepo, setIsRepo] = useState(true);

  const toSearchScreen = () => {
    if (text === "") {
    } else {
      navigation.navigate("Search Result", { query: text, isRepo: isRepo });
    }
  };

  const handleChange = (value) => {
    if (value === " " && text === "") {
    } else {
      setText(value);
    }
  };

  const handlePress = (bool) => {
    setIsRepo(bool);
    toSearchScreen();
  };

  return (
    <View style={globalStyles.container}>
      <Navbar>
        <TextInput
          style={[globalStyles.inputText]}
          onChangeText={handleChange}
          value={text}
          placeholder="Search GitHub"
          returnKeyType="search"
          onSubmitEditing={toSearchScreen}
        />
        <Icon.Button
          name="search"
          backgroundColor="black"
          onPress={toSearchScreen}
        ></Icon.Button>
      </Navbar>
      <View style={[globalStyles.contentBox, styles.contentBox]}>
        {text === "" ? <Text>Intentionally left blank</Text> : <></>}
        {text === "" ? (
          <></>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.optButton,
              {
                backgroundColor: pressed ? "grey" : "white",
              },
            ]}
            onPress={() => handlePress(true)}
          >
            <Text>Repositories with "{text}"</Text>
          </Pressable>
        )}
        {text === "" ? (
          <></>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.optButton,
              {
                backgroundColor: pressed ? "grey" : "white",
              },
            ]}
            onPress={() => handlePress(false)}
          >
            <Text>People with "{text}"</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentBox: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
  },
  optButton: {
    width: deviceWidth,
    alignItems: "center",
  },
});

export default HomeScreen;

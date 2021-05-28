import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Homescreen";
import SearchResult from "./SearchResult";

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen name={"Home Screen"} component={HomeScreen} />
        <Stack.Screen name={"Result"} component={SearchResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import SearchResult from "./SearchResult";
import RepositoryDetails from "./RepositoryDetails";

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen name={"Home Screen"} component={HomeScreen} />
        <Stack.Screen name={"Search Result"} component={SearchResult} />
        <Stack.Screen
          name={"Repository Details"}
          component={RepositoryDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;

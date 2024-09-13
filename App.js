import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserLocationStateContextProvider } from "./context/UserLocationStateContext"; // Import the UserLocationStateContextProvider

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <UserLocationStateContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="MapScreen">
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ title: "TrackGuard" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </UserLocationStateContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

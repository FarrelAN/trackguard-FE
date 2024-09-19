import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "@/screens/MapScreen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserLocationStateContextProvider } from "@/context/UserLocationStateContext";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Stack = createStackNavigator();

export default function App() {
  const [selectedTab, setSelectedTab] = useState("Items");

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <UserLocationStateContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="MapScreen">
              <Stack.Screen name="MapScreen" options={{ title: "TrackGuard" }}>
                {(props) => <MapScreen {...props} selectedTab={selectedTab} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>

          {/* Bottom Navigation Bar */}
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleTabPress("People")}
            >
              <FontAwesome6
                name="people-group"
                size={28}
                color={selectedTab === "People" ? "#007AFF" : "#ccc"}
              />
              <Text
                style={[
                  styles.navText,
                  { color: selectedTab === "People" ? "#007AFF" : "#ccc" },
                ]}
              >
                People
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleTabPress("Devices")}
            >
              <MaterialIcons
                name="devices"
                size={28}
                color={selectedTab === "Devices" ? "#007AFF" : "#ccc"}
              />
              <Text
                style={[
                  styles.navText,
                  { color: selectedTab === "Devices" ? "#007AFF" : "#ccc" },
                ]}
              >
                Devices
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleTabPress("Items")}
            >
              <Ionicons
                name="headset"
                size={28}
                color={selectedTab === "Items" ? "#007AFF" : "#ccc"}
              />
              <Text
                style={[
                  styles.navText,
                  { color: selectedTab === "Items" ? "#007AFF" : "#ccc" },
                ]}
              >
                Items
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleTabPress("Me")}
            >
              <Ionicons
                name="person-circle-sharp"
                size={28}
                color={selectedTab === "Me" ? "#007AFF" : "#ccc"}
              />
              <Text
                style={[
                  styles.navText,
                  { color: selectedTab === "Me" ? "#007AFF" : "#ccc" },
                ]}
              >
                Me
              </Text>
            </TouchableOpacity>
          </View>
        </UserLocationStateContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    opacity: 0.9,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    height: 85,
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 99, // Ensure it's the top-most element
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  navText: {
    fontSize: 12,
    fontWeight: "500",
  },
});

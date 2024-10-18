import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StatusBar,
  View,
  Platform,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Text,
} from "react-native";
import MapScreen from "@/screens/MapScreen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserLocationStateContextProvider } from "@/context/UserLocationStateContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemeProvider, useTheme } from "./ThemeContext"; // Assuming you have the ThemeContext set up

const Stack = createStackNavigator();

// Custom StatusBar component
const MyStatusBar = ({ backgroundColor, barStyle }) => {
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar
          translucent
          backgroundColor={backgroundColor}
          barStyle={barStyle}
        />
      </SafeAreaView>
    </View>
  );
};

export default function App() {
  const [selectedTab, setSelectedTab] = useState("Items");
  const colorScheme = useColorScheme(); // Detect light or dark mode

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <UserLocationStateContextProvider>
          <ThemeProvider>
            {/* Apply custom status bar logic here */}
            <MyStatusBar
              backgroundColor={colorScheme === "dark" ? "#000000" : "#FFFFFF"} // Dark or light mode background
              barStyle={
                colorScheme === "dark" ? "light-content" : "dark-content"
              } // Text color for status bar
            />

            <AppNavigator
              selectedTab={selectedTab}
              handleTabPress={handleTabPress}
            />
          </ThemeProvider>
        </UserLocationStateContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

function AppNavigator({ selectedTab, handleTabPress }) {
  const theme = useTheme(); // Access the current theme (light or dark)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapScreen">
        <Stack.Screen name="MapScreen" options={{ headerShown: false }}>
          {(props) => <MapScreen {...props} selectedTab={selectedTab} />}
        </Stack.Screen>
      </Stack.Navigator>

      <View
        style={[styles.bottomNav, { backgroundColor: theme.backgroundColor }]}
      >
        <TabItem
          icon={
            <FontAwesome6
              name="people-group"
              size={28}
              color={
                selectedTab === "People"
                  ? theme.buttonBackground
                  : theme.textColor
              }
            />
          }
          label="People"
          isSelected={selectedTab === "People"}
          onPress={() => handleTabPress("People")}
          theme={theme}
        />
        <TabItem
          icon={
            <MaterialIcons
              name="devices"
              size={28}
              color={
                selectedTab === "Devices"
                  ? theme.buttonBackground
                  : theme.textColor
              }
            />
          }
          label="Devices"
          isSelected={selectedTab === "Devices"}
          onPress={() => handleTabPress("Devices")}
          theme={theme}
        />
        <TabItem
          icon={
            <Ionicons
              name="headset"
              size={28}
              color={
                selectedTab === "Items"
                  ? theme.buttonBackground
                  : theme.textColor
              }
            />
          }
          label="Items"
          isSelected={selectedTab === "Items"}
          onPress={() => handleTabPress("Items")}
          theme={theme}
        />
        <TabItem
          icon={
            <Ionicons
              name="person-circle-sharp"
              size={28}
              color={
                selectedTab === "Me" ? theme.buttonBackground : theme.textColor
              }
            />
          }
          label="Me"
          isSelected={selectedTab === "Me"}
          onPress={() => handleTabPress("Me")}
          theme={theme}
        />
      </View>
    </NavigationContainer>
  );
}

const TabItem = ({ icon, label, onPress, theme }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    {icon}
    <Text style={[styles.navText, { color: theme.textColor }]}>{label}</Text>
  </TouchableOpacity>
);

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 47 : StatusBar.currentHeight; // Correct height for iOS/Android

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT, // Adjust height based on platform
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    borderTopWidth: 1,
    height: 85,
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 99,
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

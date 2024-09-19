import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheetComponent from "./BottomSheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const DESTINATION_COORDINATE = {
  latitude: -6.363161449043309, // Jakarta latitude
  longitude: 106.8251250125878, // Jakarta longitude
};

export const MapScreen = ({ selectedTab }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Fetch user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  // Function to center map on the user's location
  const centerToUserLocation = (mapRef) => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  // Function to center map on the destination
  const centerToDestination = (mapRef) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        longitude: DESTINATION_COORDINATE.longitude,
        latitude: DESTINATION_COORDINATE.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const mapRef = React.useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: location ? location.coords.latitude : -6.363161449043309,
          longitude: location ? location.coords.longitude : 106.8251250125878,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Destination Marker */}
        <Marker
          coordinate={DESTINATION_COORDINATE}
          title="Destination"
          description="Your target destination"
        />
      </MapView>

      {/* Stacked buttons in a container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => centerToDestination(mapRef)}
        >
          <FontAwesome6 name="location-dot" size={22} color="#007AFF" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => centerToUserLocation(mapRef)}
        >
          <MaterialIcons name="my-location" size={22} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* BottomSheetComponent */}
      <View style={styles.bottomSheetContainer}>
        <BottomSheetComponent
          userLocation={location}
          selectedTab={selectedTab}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  separator: {
    height: 2, // Thickness of the separator
    backgroundColor: "#ccc", // Light gray for the separator
    width: "100%", // Full width of the container
  },

  // Container for stacked buttons
  buttonContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 40 : 40,
    right: 20,
    backgroundColor: "#fff", // Add a white background for the container
    padding: 5,
    borderRadius: 15, // Rounded corners for the container
    elevation: 5, // Add shadow for better visual appeal on Android
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.3, // iOS shadow

    shadowRadius: 3.84, // iOS shadow
  },
  button: {
    paddingVertical: 10, // Padding for individual buttons
    paddingHorizontal: 7,
    borderRadius: 50, // Rounded individual buttons
    borderColor: "black", // Add a border to the buttons
    alignItems: "center",
  },
  bottomSheetContainer: {
    position: "absolute",
    bottom: 100, // Push it above the bottom navigation
    left: 0,
    right: 0,
  },
});

export default MapScreen;

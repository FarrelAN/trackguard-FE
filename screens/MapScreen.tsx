import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheetComponent from "./BottomSheet"; // Your bottom sheet component

// Destination coordinate (Jakarta)
const DESTINATION_COORDINATE = {
  latitude: -6.2088, // Latitude for Jakarta
  longitude: 106.8456, // Longitude for Jakarta
};

// Haversine formula to calculate distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance.toFixed(2); // Return the distance with 2 decimal places
};

export const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null); // Add distance state
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

      // Calculate distance once the location is available
      if (currentLocation) {
        const dist = calculateDistance(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          DESTINATION_COORDINATE.latitude,
          DESTINATION_COORDINATE.longitude
        );
        setDistance(dist); // Set the calculated distance
      }
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

  let text = "Waiting for location..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Lat: ${location?.coords.latitude}, Lon: ${location?.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: location ? location.coords.latitude : -6.2088,
          longitude: location ? location.coords.longitude : 106.8456,
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

      {/* Button to center map on user location */}
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => centerToUserLocation(mapRef)}
      >
        <Text style={styles.centerButtonText}>Center on Me</Text>
      </TouchableOpacity>

      {/* Button to center map on destination */}
      <TouchableOpacity
        style={styles.centerDestButton}
        onPress={() => centerToDestination(mapRef)}
      >
        <Text style={styles.centerButtonText}>Go to Destination</Text>
      </TouchableOpacity>

      {/* Bottom Sheet, passing distance and user location */}
      <BottomSheetComponent userLocation={location} distance={distance} />

      {/* Location Info */}
      <View style={styles.locationInfo}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centerButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
  },
  centerDestButton: {
    position: "absolute",
    bottom: 80,
    left: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
  },
  centerButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  locationInfo: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
});

export default MapScreen;

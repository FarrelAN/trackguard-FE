import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Device coordinates
const DEVICE_COORDINATE = {
  latitude: -6.363161449043309, // Jakarta latitude
  longitude: 106.8251250125878, // Jakarta longitude
};

const DevicesTab = ({ userLocation }) => {
  // Function to open Google Maps for directions
  const openGoogleMaps = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.coords.latitude},${userLocation.coords.longitude}&destination=${DEVICE_COORDINATE.latitude},${DEVICE_COORDINATE.longitude}&travelmode=driving`;
      Linking.openURL(url);
    } else {
      console.log("User location not available");
    }
  };

  // Function to handle destructive action presses
  const handleDestructiveAction = (action) => {
    Alert.alert("Confirm Action", `Are you sure you want to ${action}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => console.log(`${action} confirmed`) },
    ]);
  };

  return (
    <BlurView intensity={50} tint="light" style={styles.glassCard}>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceTitle}>iPhone 13</Text>
        <Text style={styles.deviceSubtitle}>
          Jalan Kecapi No. 55, South Jakarta, Jakarta 12620
        </Text>
        <Text style={styles.deviceSubtitle}>This iPhone</Text>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>Play Sound</Text>
          <Text style={styles.actionStatus}>Off</Text>
        </View>
        <TouchableOpacity style={styles.actionCard} onPress={openGoogleMaps}>
          <MaterialIcons name="directions" size={22} color="#007AFF" />
          <Text style={styles.actionTitle}>Directions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.notificationCard}>
        <Text style={styles.actionTitle}>Notifications</Text>
        <Text style={styles.actionSubtitle}>Notify When Found</Text>
      </View>

      <View style={styles.markLostCard}>
        <Text style={styles.actionTitle}>Mark As Lost</Text>
        <Text style={styles.activateText}>Activate</Text>
      </View>

      <View style={styles.destructiveActions}>
        <TouchableOpacity
          onPress={() => handleDestructiveAction("Erase This Device")}
        >
          <Text style={styles.destructiveText}>Erase This Device</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDestructiveAction("Remove This Device")}
        >
          <Text style={styles.destructiveText}>Remove This Device</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  glassCard: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  deviceInfo: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  deviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  deviceSubtitle: {
    fontSize: 14,
    marginTop: 5,
    color: "#000",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    borderWidth: 1, // Defines the border thickness
    borderColor: "black", // Sets the border color to black
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  actionStatus: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 5,
  },
  notificationCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  markLostCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  actionSubtitle: {
    fontSize: 14,
    color: "#000",
  },
  activateText: {
    fontSize: 16,
    color: "#007AFF",
    marginTop: 5,
  },
  destructiveActions: {
    marginTop: 10,
    alignItems: "center",
  },
  destructiveText: {
    color: "#FF3B30",
    fontSize: 16,
    marginTop: 10,
  },
});

export default DevicesTab;

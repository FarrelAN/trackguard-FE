import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur"; // For glassmorphism effect
import { useSharedValue } from "react-native-reanimated";

// Accept user location and selectedTab as props
const BottomSheetComponent = ({ userLocation, selectedTab }) => {
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["18%", "40%", "85%"], []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetModalRef.current?.snapToIndex(0);
    }
  }, []);

  const renderDevicesContent = () => {
    return (
      <>
        {/* Device Information */}
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceTitle}>iPhone 13</Text>
          <Text style={styles.deviceSubtitle}>
            Jalan Kecapi No. 55, South Jakarta, Jakarta 12620
          </Text>
          <Text style={styles.deviceSubtitle}>This iPhone</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>Play Sound</Text>
            <Text style={styles.actionStatus}>Off</Text>
          </View>
          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>Directions</Text>
            <Text style={styles.actionStatus}>With You</Text>
          </View>
        </View>

        {/* Additional Actions */}
        <View style={styles.notificationCard}>
          <Text style={styles.actionTitle}>Notifications</Text>
          <Text style={styles.actionSubtitle}>Notify When Found</Text>
        </View>
        <View style={styles.markLostCard}>
          <Text style={styles.actionTitle}>Mark As Lost</Text>
          <Text style={styles.activateText}>Activate</Text>
        </View>

        {/* Destructive Actions */}
        <View style={styles.destructiveActions}>
          <Text style={styles.destructiveText}>Erase This Device</Text>
          <Text style={styles.destructiveText}>Remove This Device</Text>
        </View>
      </>
    );
  };

  const distanceText = userLocation
    ? `Lat: ${userLocation?.coords.latitude}, Lon: ${userLocation?.coords.longitude}`
    : "Waiting for location...";

  const renderContent = () => {
    switch (selectedTab) {
      case "People":
        return (
          <Text style={styles.cardSubtitle}>This is the People page.</Text>
        );
      case "Devices":
        return (
          <BlurView intensity={50} tint="light" style={styles.glassCard}>
            {renderDevicesContent()}
          </BlurView>
        );
      case "Items":
        return <Text style={styles.cardSubtitle}>This is the Items page.</Text>;
      case "Me":
        return <Text style={styles.cardSubtitle}>This is the Me page.</Text>;
      default:
        return <Text style={styles.cardSubtitle}>Unknown Tab</Text>;
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enableDismissOnClose={false}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        <Text style={styles.cardTitle}>{selectedTab}</Text>
        {/* Dynamic Content */}
        {renderContent()}

        <Text style={styles.cardSubtitle}>User Location: {distanceText}</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff", // Dark grey background with transparency
  },
  glassCard: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden", // Ensure rounded corners
  },
  deviceInfo: {
    marginBottom: 20,
    // backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  deviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // White text for contrast against dark background
  },
  deviceSubtitle: {
    fontSize: 14,
    marginTop: 5,
    color: "#000", // White text for contrast against dark background
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // White text for contrast
  },
  actionStatus: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 5,
  },
  notificationCard: {
    // backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  markLostCard: {
    // backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  actionSubtitle: {
    fontSize: 14,
    color: "#000", // White text for contrast
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
  cardSubtitle: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 12,
  },
});

export default BottomSheetComponent;

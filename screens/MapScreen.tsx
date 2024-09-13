import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "@gorhom/bottom-sheet";
import { Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function MapScreen() {
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);

  // Reference to the BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Define snap points for the bottom sheet
  const snapPoints = useMemo(() => ["20%", "50%", "70%", "95%"], []);

  // Automatically present the BottomSheetModal when the component mounts
  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Handle changes in the bottom sheet
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      {/* Bottom Sheet Modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0} // Start from the first snap point ("20%")
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleComponent={() => (
          <BottomSheetHandle
            style={styles.bottomSheetHandle}
            animatedIndex={animatedIndex}
            animatedPosition={animatedPosition}
          />
        )}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={styles.deviceInfo}>
            <Text style={styles.deviceName}>Device Name</Text>
            <Text style={styles.deviceDistance}>0 mi away</Text>
          </View>
          <View style={styles.actionsContainer}>
            <Text>Play Sound</Text>
            <Text>Directions</Text>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetHandle: {
    backgroundColor: "#ccc",
    height: 4,
    width: 100,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 10,
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  deviceInfo: {
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deviceDistance: {
    color: "#666",
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

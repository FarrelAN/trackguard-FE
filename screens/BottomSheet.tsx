import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "@gorhom/bottom-sheet";
import { useSharedValue } from "react-native-reanimated";

const BottomSheetComponent = ({ userLocation, distance }) => {
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Define snap points for the bottom sheet
  const snapPoints = useMemo(() => ["7%", "20%", "50%", "70%", "95%"], []);

  // Automatically present the BottomSheetModal when the component mounts
  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Handle changes in the bottom sheet
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetModalRef.current?.snapToIndex(0);
    }
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enableDismissOnClose={false}
      handleComponent={() => (
        <BottomSheetHandle
          style={styles.bottomSheetHandle}
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
        />
      )}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        {/* Item Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Item Info</Text>
          <Text style={styles.cardSubtitle}>Device Name: TrackGuard</Text>
          <Text style={styles.cardSubtitle}>
            Distance: {distance ? `${distance} km` : "Calculating..."}
          </Text>
        </View>

        {/* Direction and Sound Action Cards */}
        <View style={styles.row}>
          <View style={styles.actionCard}>
            <Text style={styles.cardTitle}>Directions to Item</Text>
          </View>

          <View style={styles.actionCard}>
            <Text style={styles.cardTitle}>Activate Sound</Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionCard: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 20,
    width: "45%", // Adjusting width for two cards
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomSheetComponent;

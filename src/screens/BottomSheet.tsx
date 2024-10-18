import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useSharedValue } from "react-native-reanimated";

// Import tab components from the index.ts file
import {
  DevicesTab,
  ItemsTab,
  MeTab,
  PeopleTab,
} from "../../src/components/bottomsheet/tabs";

const BottomSheetComponent = ({ userLocation, selectedTab }) => {
  const animatedIndex = useSharedValue<number>(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["18%", "35%", "85%"], []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetModalRef.current?.snapToIndex(0);
    }
  }, []);

  const distanceText = userLocation
    ? `Lat: ${userLocation?.coords.latitude}, Lon: ${userLocation?.coords.longitude}`
    : "Waiting for location...";

  const renderContent = () => {
    switch (selectedTab) {
      case "People":
        return <PeopleTab />;
      case "Devices":
        return <DevicesTab userLocation={userLocation} />;
      case "Items":
        return <ItemsTab />;
      case "Me":
        return <MeTab />;
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
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
});

export default BottomSheetComponent;

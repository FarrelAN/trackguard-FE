import React from "react";
import { Text, StyleSheet } from "react-native";

const MeTab = () => {
  return <Text style={styles.text}>This is the Me page.</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#000",
  },
});

export default MeTab;

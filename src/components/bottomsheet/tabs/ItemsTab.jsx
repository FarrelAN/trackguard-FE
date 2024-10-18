import React from "react";
import { Text, StyleSheet } from "react-native";

const ItemsTab = () => {
  return <Text style={styles.text}>This is the Items page.</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#000",
  },
});

export default ItemsTab;

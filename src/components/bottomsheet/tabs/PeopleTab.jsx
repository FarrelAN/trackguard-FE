import React from "react";
import { Text, StyleSheet } from "react-native";

const PeopleTab = () => {
  return <Text style={styles.text}>This is the People page.</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#000",
  },
});

export default PeopleTab;

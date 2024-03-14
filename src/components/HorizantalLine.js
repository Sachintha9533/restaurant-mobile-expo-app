import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../../theme";

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginTop: theme.spacing.default,
  },
});

export default HorizontalLine;

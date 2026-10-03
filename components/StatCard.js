import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatCard({ title, value, subtitle }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  title: {
    fontSize: 13,
    color: "#667085",
    marginBottom: 8,
  },

  value: {
    fontSize: 25,
    fontWeight: "700",
    color: "#172B4D",
  },

  subtitle: {
    fontSize: 12,
    color: "#667085",
    marginTop: 5,
  },
});
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PerformanceCard({ course }) {
  const getPerformanceStatus = () => {
    if (course.marks >= 80) {
      return "Excellent";
    }

    if (course.marks >= 70) {
      return "Satisfactory";
    }

    return "Needs Attention";
  };

  const status = getPerformanceStatus();

  const needsAttention = course.marks < 70;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.courseInfo}>
          <Text style={styles.courseCode}>
            {course.code}
          </Text>

          <Text style={styles.courseName}>
            {course.name}
          </Text>
        </View>

        <Text
          style={[
            styles.marks,
            needsAttention && styles.lowMarks,
          ]}
        >
          {course.marks}%
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progress,
            {
              width: `${course.marks}%`,
            },
          ]}
        />
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.statusLabel}>
          Performance
        </Text>

        <Text
          style={[
            styles.status,
            needsAttention && styles.lowStatus,
          ]}
        >
          {status}
        </Text>
      </View>

      {needsAttention && (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            ⚠ Consider giving this course more attention.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  courseInfo: {
    flex: 1,
    marginRight: 10,
  },

  courseCode: {
    fontSize: 12,
    color: "#667085",
    marginBottom: 4,
  },

  courseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172B4D",
  },

  marks: {
    fontSize: 20,
    fontWeight: "700",
    color: "#28527A",
  },

  lowMarks: {
    color: "#D92D20",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E9EEF5",
    borderRadius: 10,
    marginTop: 14,
    overflow: "hidden",
  },

  progress: {
    height: 8,
    backgroundColor: "#28527A",
    borderRadius: 10,
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  statusLabel: {
    color: "#667085",
    fontSize: 12,
  },

  status: {
    color: "#027A48",
    fontSize: 12,
    fontWeight: "700",
  },

  lowStatus: {
    color: "#B42318",
  },

  warning: {
    backgroundColor: "#FEF3F2",
    padding: 9,
    borderRadius: 8,
    marginTop: 10,
  },

  warningText: {
    color: "#B42318",
    fontSize: 12,
    fontWeight: "600",
  },
});
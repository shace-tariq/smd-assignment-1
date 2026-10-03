import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CourseCard({ course }) {
  const isLowAttendance = course.attendance < 75;

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

        <Text style={styles.marks}>
          {course.marks}%
        </Text>
      </View>

      <View style={styles.attendanceRow}>
        <Text style={styles.attendanceLabel}>
          Attendance
        </Text>

        <Text
          style={[
            styles.attendanceValue,
            isLowAttendance && styles.lowAttendance,
          ]}
        >
          {course.attendance}%
        </Text>
      </View>

      {isLowAttendance && (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            ⚠ Attendance below 75%
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
    fontSize: 18,
    fontWeight: "700",
    color: "#28527A",
  },

  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  attendanceLabel: {
    color: "#667085",
    fontSize: 13,
  },

  attendanceValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#28527A",
  },

  lowAttendance: {
    color: "#D92D20",
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
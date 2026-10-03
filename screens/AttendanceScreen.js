import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";

import { courses } from "../data/studentData";
import CourseCard from "../components/CourseCard";

export default function AttendanceScreen() {
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [calculatedAttendance, setCalculatedAttendance] = useState(null);
  const [classesNeeded, setClassesNeeded] = useState(null);
  const [error, setError] = useState("");

  const calculateAttendance = () => {
    setError("");
    setCalculatedAttendance(null);
    setClassesNeeded(null);

    const attendedClasses = Number(attended);
    const totalClasses = Number(total);

    // Empty input
    if (attended === "" || total === "") {
      setError("Please enter both values.");
      return;
    }

    // Invalid numbers
    if (
      !Number.isFinite(attendedClasses) ||
      !Number.isFinite(totalClasses)
    ) {
      setError("Please enter valid numbers.");
      return;
    }

    // Total classes must be positive
    if (totalClasses <= 0) {
      setError("Total classes must be greater than 0.");
      return;
    }

    // Attended classes cannot be negative
    if (attendedClasses < 0) {
      setError("Attended classes cannot be negative.");
      return;
    }

    // Attended cannot exceed total
    if (attendedClasses > totalClasses) {
      setError(
        "Attended classes cannot be greater than total classes."
      );
      return;
    }

    // Current attendance
    const percentage =
      (attendedClasses / totalClasses) * 100;

    setCalculatedAttendance(percentage.toFixed(1));

    // Already at or above 75%
    if (percentage >= 75) {
      setClassesNeeded(0);
      return;
    }

    /*
      We need to find the smallest number of future classes
      that must be attended to reach 75%.

      Formula:

      (attended + x) / (total + x) >= 0.75

      We test increasing values of x until the condition
      becomes true.
    */

    let additionalClasses = 0;

    while (
      (attendedClasses + additionalClasses) /
        (totalClasses + additionalClasses) <
      0.75
    ) {
      additionalClasses++;
    }

    setClassesNeeded(additionalClasses);
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Attendance
      </Text>

      <Text style={styles.description}>
        Monitor your attendance and calculate how many
        classes you need to reach the 75% requirement.
      </Text>

      {/* Course Attendance */}
      <Text style={styles.sectionTitle}>
        Course Attendance
      </Text>

      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}

      {/* Calculator */}
      <Text style={styles.sectionTitle}>
        Attendance Calculator
      </Text>

      <View style={styles.calculatorCard}>
        <Text style={styles.label}>
          Classes Attended
        </Text>

        <TextInput
          style={styles.input}
          value={attended}
          onChangeText={setAttended}
          placeholder="e.g. 18"
          placeholderTextColor="#98A2B3"
          keyboardType="numeric"
        />

        <Text style={styles.label}>
          Total Classes
        </Text>

        <TextInput
          style={styles.input}
          value={total}
          onChangeText={setTotal}
          placeholder="e.g. 25"
          placeholderTextColor="#98A2B3"
          keyboardType="numeric"
        />

        <Pressable
          style={styles.calculateButton}
          onPress={calculateAttendance}
        >
          <Text style={styles.calculateButtonText}>
            Calculate Attendance
          </Text>
        </Pressable>

        {/* Validation Error */}
        {error !== "" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}

        {/* Calculation Result */}
        {calculatedAttendance !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>
              Current Attendance
            </Text>

            <Text
              style={[
                styles.resultValue,
                Number(calculatedAttendance) < 75 &&
                  styles.lowResult,
              ]}
            >
              {calculatedAttendance}%
            </Text>

            {/* Below 75% */}
            {Number(calculatedAttendance) < 75 && (
              <View style={styles.warningSection}>
                <Text style={styles.warningTitle}>
                  ⚠ Attendance below 75%
                </Text>

                <Text style={styles.warningDescription}>
                  You need to attend the next{" "}
                  <Text style={styles.boldText}>
                    {classesNeeded}
                  </Text>{" "}
                  consecutive classes to reach 75%.
                </Text>
              </View>
            )}

            {/* At or above 75% */}
            {Number(calculatedAttendance) >= 75 && (
              <View style={styles.successSection}>
                <Text style={styles.successTitle}>
                  ✓ Attendance requirement met
                </Text>

                <Text style={styles.successDescription}>
                  You are currently at or above the 75%
                  attendance requirement.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#172B4D",
  },

  description: {
    color: "#667085",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 12,
    marginTop: 5,
  },

  calculatorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E3E8EF",
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    color: "#172B4D",
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },

  calculateButton: {
    backgroundColor: "#28527A",
    paddingVertical: 13,
    borderRadius: 9,
    marginTop: 2,
  },

  calculateButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
  },

  errorBox: {
    backgroundColor: "#FEF3F2",
    borderRadius: 9,
    padding: 11,
    marginTop: 12,
  },

  errorText: {
    color: "#B42318",
    fontSize: 13,
    fontWeight: "600",
  },

  resultBox: {
    backgroundColor: "#F4F6FA",
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },

  resultLabel: {
    color: "#667085",
    fontSize: 13,
    textAlign: "center",
  },

  resultValue: {
    color: "#28527A",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 5,
    textAlign: "center",
  },

  lowResult: {
    color: "#D92D20",
  },

  warningSection: {
    backgroundColor: "#FEF3F2",
    borderRadius: 9,
    padding: 12,
    marginTop: 12,
  },

  warningTitle: {
    color: "#B42318",
    fontSize: 13,
    fontWeight: "700",
  },

  warningDescription: {
    color: "#667085",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  boldText: {
    fontWeight: "700",
    color: "#B42318",
  },

  successSection: {
    backgroundColor: "#ECFDF3",
    borderRadius: 9,
    padding: 12,
    marginTop: 12,
  },

  successTitle: {
    color: "#027A48",
    fontSize: 13,
    fontWeight: "700",
  },

  successDescription: {
    color: "#667085",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
});
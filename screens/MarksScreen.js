import React, { useMemo } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { courses } from "../data/studentData";
import PerformanceCard from "../components/PerformanceCard";

export default function MarksScreen() {
  const averageMarks = useMemo(() => {
    if (courses.length === 0) {
      return 0;
    }

    const totalMarks = courses.reduce(
      (sum, course) => sum + course.marks,
      0
    );

    return Math.round(totalMarks / courses.length);
  }, []);

  const highPerformingCourses = courses.filter(
    (course) => course.marks >= 80
  );

  const satisfactoryCourses = courses.filter(
    (course) =>
      course.marks >= 70 && course.marks < 80
  );

  const coursesNeedingImprovement = courses.filter(
    (course) => course.marks < 70
  );

  const getOverallStatus = () => {
    if (courses.length === 0) {
      return "No data available";
    }

    if (averageMarks >= 80) {
      return "Excellent";
    }

    if (averageMarks >= 70) {
      return "Satisfactory";
    }

    return "Needs Attention";
  };

  const overallStatus = getOverallStatus();

  if (courses.length === 0) {
    return (
      <View style={styles.emptyScreen}>
        <Text style={styles.emptyTitle}>
          No course data available
        </Text>

        <Text style={styles.emptyText}>
          Course performance will appear here when course
          data is available.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Marks & Performance
      </Text>

      <Text style={styles.description}>
        Review your course performance and identify subjects
        that may need more attention.
      </Text>

      {/* Overall Performance */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>
          Average Marks
        </Text>

        <Text style={styles.summaryValue}>
          {averageMarks}%
        </Text>

        <Text style={styles.summaryStatus}>
          {overallStatus}
        </Text>

        <Text style={styles.summaryDescription}>
          Across {courses.length} registered courses
        </Text>
      </View>

      {/* Performance Categories */}
      <View style={styles.statsRow}>
        <View style={styles.smallCard}>
          <Text style={styles.smallCardLabel}>
            Excellent
          </Text>

          <Text style={styles.smallCardValue}>
            {highPerformingCourses.length}
          </Text>

          <Text style={styles.smallCardDescription}>
            80% and above
          </Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.smallCardLabel}>
            Satisfactory
          </Text>

          <Text style={styles.smallCardValue}>
            {satisfactoryCourses.length}
          </Text>

          <Text style={styles.smallCardDescription}>
            70–79%
          </Text>
        </View>
      </View>

      <View style={styles.attentionCard}>
        <View style={styles.attentionInfo}>
          <Text style={styles.attentionLabel}>
            Needs Attention
          </Text>

          <Text style={styles.attentionDescription}>
            Courses below 70%
          </Text>
        </View>

        <Text style={styles.attentionValue}>
          {coursesNeedingImprovement.length}
        </Text>
      </View>

      {/* Course Performance */}
      <Text style={styles.sectionTitle}>
        Course Performance
      </Text>

      {courses.map((course) => (
        <PerformanceCard
          key={course.id}
          course={course}
        />
      ))}
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
    marginBottom: 20,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E3E8EF",
    alignItems: "center",
    marginBottom: 12,
  },

  summaryLabel: {
    fontSize: 13,
    color: "#667085",
  },

  summaryValue: {
    fontSize: 34,
    fontWeight: "700",
    color: "#28527A",
    marginTop: 5,
  },

  summaryStatus: {
    fontSize: 13,
    fontWeight: "700",
    color: "#027A48",
    marginTop: 3,
  },

  summaryDescription: {
    fontSize: 12,
    color: "#667085",
    marginTop: 5,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  smallCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  smallCardLabel: {
    fontSize: 12,
    color: "#667085",
  },

  smallCardValue: {
    fontSize: 25,
    fontWeight: "700",
    color: "#172B4D",
    marginTop: 5,
  },

  smallCardDescription: {
    fontSize: 12,
    color: "#667085",
    marginTop: 2,
  },

  attentionCard: {
    backgroundColor: "#FEF3F2",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FECACA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  attentionInfo: {
    flex: 1,
  },

  attentionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B42318",
  },

  attentionDescription: {
    fontSize: 12,
    color: "#667085",
    marginTop: 3,
  },

  attentionValue: {
    fontSize: 25,
    fontWeight: "700",
    color: "#D92D20",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 12,
  },

  emptyScreen: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172B4D",
  },

  emptyText: {
    fontSize: 13,
    color: "#667085",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 7,
  },
});
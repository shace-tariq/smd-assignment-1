import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  ScrollView,
} from "react-native";

import {
  SafeAreaView,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import {
  student,
  courses,
  assignments,
} from "./data/studentData";

import StatCard from "./components/StatCard";
import CourseCard from "./components/CourseCard";

import AttendanceScreen from "./screens/AttendanceScreen";
import MarksScreen from "./screens/MarksScreen";
import CoursesScreen from "./screens/CoursesScreen";
import DashboardScreen from "./screens/DashboardScreen";
import MarksAnalysisScreen from "./screens/MarksAnalysisScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const averageAttendance = useMemo(() => {
    const totalAttendance = courses.reduce(
      (sum, course) => sum + course.attendance,
      0
    );

    return Math.round(totalAttendance / courses.length);
  }, []);

  const coursesNeedingAttention = courses.filter(
    (course) => course.attendance < 75
  );

  const renderHomeScreen = () => {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>
          Academic Overview
        </Text>

        <Text style={styles.description}>
          A quick view of your academic performance and
          areas that need attention.
        </Text>

        {/* Student Information */}
        <View style={styles.studentCard}>
          <Text style={styles.studentName}>
            {student.name}
          </Text>

          <Text style={styles.studentInfo}>
            {student.degree} • {student.semester}
          </Text>
        </View>

        {/* Statistics */}
        <View style={styles.statsRow}>
          <StatCard
            title="Current CGPA"
            value={student.cgpa}
            subtitle="Overall performance"
          />

          <StatCard
            title="Attendance"
            value={`${averageAttendance}%`}
            subtitle="Across all courses"
          />
        </View>

        {/* Attention Required */}
        <Text style={styles.sectionTitle}>
          Attention Required
        </Text>

        {coursesNeedingAttention.length > 0 ? (
          coursesNeedingAttention.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              Everything looks good
            </Text>

            <Text style={styles.emptyText}>
              No courses currently require attention.
            </Text>
          </View>
        )}

        {/* Upcoming Assignments */}
        <Text style={styles.sectionTitle}>
          Upcoming
        </Text>

        {assignments.map((assignment) => (
          <View
            key={assignment.id}
            style={styles.assignmentCard}
          >
            <View style={styles.assignmentInfo}>
              <Text style={styles.assignmentCourse}>
                {assignment.course}
              </Text>

              <Text style={styles.assignmentTitle}>
                {assignment.title}
              </Text>
            </View>

            <Text style={styles.daysLeft}>
              {assignment.daysLeft} days
            </Text>
          </View>
        ))}

        {/* Academic Tools */}
        <Text style={styles.sectionTitle}>
          Academic Tools
        </Text>

        <Pressable
          style={styles.actionCard}
          onPress={() => setCurrentScreen("attendance")}
        >
          <Text style={styles.actionTitle}>
            Attendance
          </Text>

          <Text style={styles.actionDescription}>
            View course attendance and calculate required
            attendance.
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionCard}
          onPress={() => setCurrentScreen("marksAnalysis")}
        >
          <Text style={styles.actionTitle}>
            Marks Analysis
          </Text>

          <Text style={styles.actionDescription}>
            See ABS obtained, remaining evaluation, class average,
            and projected grades.
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionCard}
          onPress={() => setCurrentScreen("courses")}
        >
          <Text style={styles.actionTitle}>
            My Courses
          </Text>

          <Text style={styles.actionDescription}>
            Search and view your registered courses.
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionCard}
          onPress={() => setCurrentScreen("dashboard")}
        >
          <Text style={styles.actionTitle}>
            Performance Dashboard
          </Text>

          <Text style={styles.actionDescription}>
            Explore your academic data visually.
          </Text>
        </Pressable>
      </ScrollView>
    );
  };

  const renderCurrentScreen = () => {
    if (currentScreen === "home") {
      return renderHomeScreen();
    }

    if (currentScreen === "attendance") {
      return <AttendanceScreen />;
    }

    if (currentScreen === "marks") {
      return <MarksScreen />;
    }
    if (currentScreen === "marksAnalysis") {
      return <MarksAnalysisScreen />;
    }
    if (currentScreen === "courses") {
      return <CoursesScreen />;
    }

    if (currentScreen === "dashboard") {
      return <DashboardScreen />;
    }

    return renderHomeScreen();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>
              FLEX Insight
            </Text>

            <Text style={styles.headerSubtitle}>
              {student.batch}
            </Text>
          </View>

          <Text style={styles.profileText}>
            {student.name}
          </Text>
        </View>

        {/* Current Screen */}
        <View style={styles.screenContainer}>
          {renderCurrentScreen()}

          {currentScreen !== "home" && (
            <View style={styles.backButtonContainer}>
              <Pressable
                style={styles.backButton}
                onPress={() => setCurrentScreen("home")}
              >
                <Text style={styles.backButtonText}>
                  ← Back to Overview
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  header: {
    backgroundColor: "#28527A",
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#DCEAF7",
    fontSize: 12,
    marginTop: 3,
  },

  profileText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  screenContainer: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  greeting: {
    fontSize: 27,
    fontWeight: "700",
    color: "#172B4D",
  },

  description: {
    color: "#667085",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 18,
  },

  studentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  studentName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172B4D",
  },

  studentInfo: {
    color: "#667085",
    marginTop: 5,
    fontSize: 13,
  },

  statsRow: {
    flexDirection: "row",
    marginHorizontal: -5,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 12,
    marginTop: 5,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#172B4D",
  },

  emptyText: {
    fontSize: 13,
    color: "#667085",
    marginTop: 5,
  },

  assignmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  assignmentInfo: {
    flex: 1,
  },

  assignmentCourse: {
    color: "#667085",
    fontSize: 12,
  },

  assignmentTitle: {
    color: "#172B4D",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 3,
  },

  daysLeft: {
    color: "#28527A",
    fontSize: 12,
    fontWeight: "700",
  },

  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 17,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#28527A",
  },

  actionDescription: {
    fontSize: 13,
    color: "#667085",
    marginTop: 5,
    lineHeight: 19,
  },

  backButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 4,
    backgroundColor: "#F4F6FA",
  },

  backButton: {
    backgroundColor: "#28527A",
    padding: 14,
    borderRadius: 10,
  },

  backButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },
});
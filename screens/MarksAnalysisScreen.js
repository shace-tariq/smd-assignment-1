import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

import { courses } from "../data/studentData";
import {
  getCourseAnalysis,
} from "../utils/gradeCalculations";

export default function MarksAnalysisScreen() {
  const [selectedCourseId, setSelectedCourseId] = useState(
    courses.length > 0 ? courses[0].id : null
  );

  const [showCourseList, setShowCourseList] = useState(false);

  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId
  );

  const analysis = useMemo(() => {
    if (!selectedCourse) {
      return null;
    }

    return getCourseAnalysis(selectedCourse);
  }, [selectedCourse]);

  if (!selectedCourse || !analysis) {
    return (
      <View style={styles.emptyScreen}>
        <Text style={styles.emptyTitle}>
          No course data available
        </Text>

        <Text style={styles.emptyText}>
          Course analysis will appear here when course data
          is available.
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
        Marks Analysis
      </Text>

      <Text style={styles.description}>
        Understand your current ABS, remaining evaluation,
        class performance, and possible final grades.
      </Text>

      {/* Course Selector */}
      <Text style={styles.sectionLabel}>
        Select Course
      </Text>

      <Pressable
        style={styles.courseSelector}
        onPress={() =>
          setShowCourseList(!showCourseList)
        }
      >
        <View>
          <Text style={styles.selectedCourseCode}>
            {selectedCourse.code}
          </Text>

          <Text style={styles.selectedCourseName}>
            {selectedCourse.name}
          </Text>
        </View>

        <Text style={styles.arrow}>
          {showCourseList ? "▲" : "▼"}
        </Text>
      </Pressable>

      {showCourseList && (
        <View style={styles.courseList}>
          {courses.map((course) => (
            <Pressable
              key={course.id}
              style={[
                styles.courseOption,
                course.id === selectedCourseId &&
                  styles.selectedCourseOption,
              ]}
              onPress={() => {
                setSelectedCourseId(course.id);
                setShowCourseList(false);
              }}
            >
              <Text style={styles.optionCode}>
                {course.code}
              </Text>

              <Text style={styles.optionName}>
                {course.name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Current Standing */}
      <Text style={styles.sectionTitle}>
        Current Standing
      </Text>

      <View style={styles.mainCard}>
        <View style={styles.mainCardHeader}>
          <Text style={styles.mainCardTitle}>
            ABS Obtained
          </Text>

          <Text style={styles.mainCardValue}>
            {analysis.absObtained.toFixed(1)} /{" "}
            {analysis.absEvaluated.toFixed(1)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              ABS Evaluated
            </Text>

            <Text style={styles.infoValue}>
              {analysis.absEvaluated.toFixed(1)}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              ABS Remaining
            </Text>

            <Text style={styles.infoValue}>
              {analysis.absRemaining.toFixed(1)}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              Current Performance
            </Text>

            <Text style={styles.infoValue}>
              {analysis.currentPerformance.toFixed(1)}%
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              Current Grade
            </Text>

            <Text style={styles.gradeValue}>
              {analysis.currentGrade}
            </Text>
          </View>
        </View>
      </View>

      {/* Class Comparison */}
      <Text style={styles.sectionTitle}>
        Class Comparison
      </Text>

      <View style={styles.comparisonCard}>
        <View style={styles.comparisonRow}>
          <View>
            <Text style={styles.comparisonLabel}>
              Your ABS
            </Text>

            <Text style={styles.comparisonValue}>
              {analysis.absObtained.toFixed(1)} ABS
            </Text>
          </View>

          <View style={styles.comparisonRight}>
            <Text style={styles.comparisonLabel}>
              Class Average
            </Text>

            <Text style={styles.comparisonValue}>
              {analysis.classAverageABS.toFixed(1)} ABS
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.differenceBox,
            analysis.differenceFromClassAverage >= 0
              ? styles.aboveAverage
              : styles.belowAverage,
          ]}
        >
          <Text
            style={[
              styles.differenceText,
              analysis.differenceFromClassAverage >= 0
                ? styles.aboveAverageText
                : styles.belowAverageText,
            ]}
          >
            {analysis.differenceFromClassAverage >= 0
              ? "+"
              : ""}
            {analysis.differenceFromClassAverage.toFixed(1)}
            % current performance vs class average
          </Text>
        </View>
      </View>

      {/* Assessment Breakdown */}
      <Text style={styles.sectionTitle}>
        Assessment Breakdown
      </Text>

      <View style={styles.breakdownCard}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.assessmentColumn]}>
            Assessment
          </Text>

          <Text style={[styles.headerText, styles.weightColumn]}>
            Weight
          </Text>

          <Text style={[styles.headerText, styles.marksColumn]}>
            Your Marks
          </Text>
        </View>

        {analysis.evaluatedAssessments.map(
          (assessment) => (
            <View
              key={assessment.id}
              style={styles.tableRow}
            >
              <View style={styles.assessmentColumn}>
                <Text style={styles.assessmentName}>
                  {assessment.name}
                </Text>
              </View>

              <Text style={styles.weightColumn}>
                {assessment.weight} ABS
              </Text>

              <Text style={styles.marksColumn}>
                {assessment.obtained}/
                {assessment.total}
              </Text>
            </View>
          )
        )}

        {analysis.remainingAssessments.length > 0 && (
          <>
            <View style={styles.remainingHeader}>
              <Text style={styles.remainingHeaderText}>
                Remaining Evaluation
              </Text>
            </View>

            {analysis.remainingAssessments.map(
              (assessment) => (
                <View
                  key={assessment.id}
                  style={styles.tableRow}
                >
                  <View style={styles.assessmentColumn}>
                    <Text style={styles.assessmentName}>
                      {assessment.name}
                    </Text>
                  </View>

                  <Text style={styles.weightColumn}>
                    {assessment.weight} ABS
                  </Text>

                  <Text style={styles.remainingText}>
                    Not evaluated
                  </Text>
                </View>
              )
            )}
          </>
        )}
      </View>

      {/* Maximum Possible */}
      <Text style={styles.sectionTitle}>
        Final Grade Outlook
      </Text>

      <View style={styles.outlookCard}>
        <Text style={styles.outlookLabel}>
          Current ABS
        </Text>

        <Text style={styles.outlookValue}>
          {analysis.absObtained.toFixed(1)} ABS
        </Text>

        <Text style={styles.outlookLabel}>
          Maximum Possible Final ABS
        </Text>

        <Text style={styles.maximumValue}>
          {analysis.maximumPossibleABS.toFixed(1)} ABS
        </Text>

        <Text style={styles.outlookDescription}>
          This assumes you obtain full marks in every
          remaining assessment.
        </Text>
      </View>

      {/* Grade Projection */}
      <Text style={styles.sectionTitle}>
        Grade Projection
      </Text>

      <View style={styles.projectionCard}>
        {analysis.gradeProjections.map((projection) => (
          <View
            key={projection.grade}
            style={styles.projectionRow}
          >
            <Text style={styles.projectionGrade}>
              {projection.grade}
            </Text>

            {projection.alreadyReached ? (
              <Text style={styles.reachedText}>
                Already reached
              </Text>
            ) : projection.achievable ? (
              <View style={styles.projectionInfo}>
                <Text style={styles.requiredABS}>
                  Need {projection.requiredABS.toFixed(1)} ABS
                </Text>

                <Text style={styles.requiredPercentage}>
                  {projection.requiredRemainingPercentage.toFixed(
                    1
                  )}
                  % of remaining evaluation
                </Text>
              </View>
            ) : (
              <Text style={styles.impossibleText}>
                Impossible
              </Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>
          How to read this
        </Text>

        <Text style={styles.noteText}>
          ABS means absolute marks. Your course is worth
          100 ABS in total. The app calculates your current
          ABS from evaluated assessments and shows how much
          ABS remains.
        </Text>
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
    marginBottom: 20,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 7,
  },

  courseSelector: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectedCourseCode: {
    color: "#667085",
    fontSize: 11,
    marginBottom: 3,
  },

  selectedCourseName: {
    color: "#172B4D",
    fontSize: 15,
    fontWeight: "600",
  },

  arrow: {
    color: "#28527A",
    fontSize: 13,
  },

  courseList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    marginTop: 5,
    overflow: "hidden",
  },

  courseOption: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EAECF0",
  },

  selectedCourseOption: {
    backgroundColor: "#F4F6FA",
  },

  optionCode: {
    color: "#667085",
    fontSize: 11,
  },

  optionName: {
    color: "#172B4D",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172B4D",
    marginTop: 24,
    marginBottom: 12,
  },

  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  mainCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mainCardTitle: {
    color: "#667085",
    fontSize: 13,
  },

  mainCardValue: {
    color: "#28527A",
    fontSize: 23,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#EAECF0",
    marginVertical: 15,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    color: "#667085",
    fontSize: 11,
  },

  infoValue: {
    color: "#172B4D",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 4,
  },

  gradeValue: {
    color: "#027A48",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 4,
  },

  comparisonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  comparisonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  comparisonRight: {
    alignItems: "flex-end",
  },

  comparisonLabel: {
    color: "#667085",
    fontSize: 12,
  },

  comparisonValue: {
    color: "#172B4D",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },

  differenceBox: {
    borderRadius: 9,
    padding: 11,
    marginTop: 14,
  },

  aboveAverage: {
    backgroundColor: "#ECFDF3",
  },

  belowAverage: {
    backgroundColor: "#FEF3F2",
  },

  differenceText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
  },

  aboveAverageText: {
    color: "#027A48",
  },

  belowAverageText: {
    color: "#B42318",
  },

  breakdownCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E8EF",
    overflow: "hidden",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F4F6FA",
    padding: 12,
    alignItems: "center",
  },

  headerText: {
    color: "#667085",
    fontSize: 11,
    fontWeight: "700",
  },

  assessmentColumn: {
    flex: 1.6,
  },

  weightColumn: {
    flex: 0.9,
    textAlign: "center",
  },

  marksColumn: {
    flex: 1.1,
    textAlign: "right",
  },

  tableRow: {
    flexDirection: "row",
    padding: 13,
    borderTopWidth: 1,
    borderTopColor: "#EAECF0",
    alignItems: "center",
  },

  assessmentName: {
    color: "#172B4D",
    fontSize: 13,
    fontWeight: "600",
  },

  remainingHeader: {
    backgroundColor: "#F9FAFB",
    padding: 11,
    borderTopWidth: 1,
    borderTopColor: "#EAECF0",
  },

  remainingHeaderText: {
    color: "#667085",
    fontSize: 12,
    fontWeight: "700",
  },

  remainingText: {
    flex: 1.1,
    color: "#98A2B3",
    fontSize: 11,
    textAlign: "right",
  },

  outlookCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  outlookLabel: {
    color: "#667085",
    fontSize: 12,
    marginTop: 4,
  },

  outlookValue: {
    color: "#172B4D",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 3,
    marginBottom: 14,
  },

  maximumValue: {
    color: "#28527A",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 3,
  },

  outlookDescription: {
    color: "#667085",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },

  projectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E8EF",
    overflow: "hidden",
  },

  projectionRow: {
    minHeight: 58,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EAECF0",
    flexDirection: "row",
    alignItems: "center",
  },

  projectionGrade: {
    width: 45,
    color: "#172B4D",
    fontSize: 16,
    fontWeight: "700",
  },

  projectionInfo: {
    flex: 1,
  },

  requiredABS: {
    color: "#172B4D",
    fontSize: 13,
    fontWeight: "600",
  },

  requiredPercentage: {
    color: "#667085",
    fontSize: 11,
    marginTop: 2,
  },

  reachedText: {
    color: "#027A48",
    fontSize: 12,
    fontWeight: "600",
  },

  impossibleText: {
    color: "#D92D20",
    fontSize: 12,
    fontWeight: "600",
  },

  noteCard: {
    backgroundColor: "#F4F6FA",
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },

  noteTitle: {
    color: "#172B4D",
    fontSize: 13,
    fontWeight: "700",
  },

  noteText: {
    color: "#667085",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },

  emptyScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  emptyTitle: {
    color: "#172B4D",
    fontSize: 18,
    fontWeight: "700",
  },

  emptyText: {
    color: "#667085",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 7,
  },
});
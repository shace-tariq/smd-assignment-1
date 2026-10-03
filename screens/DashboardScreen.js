import React, { useMemo } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

import {
  BarChart,
  PieChart,
} from "react-native-chart-kit";

import { courses } from "../data/studentData";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const attendanceData = useMemo(() => {
    return {
      labels: courses.map((course) => course.code),
      datasets: [
        {
          data: courses.map((course) => course.attendance),
        },
      ],
    };
  }, []);

  const performanceData = useMemo(() => {
    const above80 = courses.filter(
      (course) => course.marks >= 80
    ).length;

    const between70And79 = courses.filter(
      (course) => course.marks >= 70 && course.marks < 80
    ).length;

    const below70 = courses.filter(
      (course) => course.marks < 70
    ).length;

    return [
      {
        name: "80%+",
        population: above80,
        color: "#28527A",
        legendFontColor: "#344054",
        legendFontSize: 12,
      },
      {
        name: "70–79%",
        population: between70And79,
        color: "#5B8DB8",
        legendFontColor: "#344054",
        legendFontSize: 12,
      },
      {
        name: "Below 70%",
        population: below70,
        color: "#D92D20",
        legendFontColor: "#344054",
        legendFontSize: 12,
      },
    ].filter((item) => item.population > 0);
  }, []);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Performance Dashboard
      </Text>

      <Text style={styles.description}>
        Visualize your academic performance and identify
        areas that may need attention.
      </Text>

      {/* Attendance Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>
          Attendance by Course
        </Text>

        <Text style={styles.chartDescription}>
          Current attendance percentage for each course.
        </Text>

        <BarChart
          data={attendanceData}
          width={screenWidth - 40}
          height={260}
          fromZero
          yAxisSuffix="%"
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
        />
      </View>

      {/* Performance Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>
          Performance Distribution
        </Text>

        <Text style={styles.chartDescription}>
          Distribution of courses based on current marks.
        </Text>

        <PieChart
          data={performanceData}
          width={screenWidth - 40}
          height={230}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[0, 0]}
          absolute
        />
      </View>

      {/* Insight */}
      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>
          Academic Insight
        </Text>

        <Text style={styles.insightText}>
          Courses with attendance below 75% require
          attention. Use the Attendance section to calculate
          your current attendance and monitor your progress.
        </Text>
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  decimalPlaces: 0,
  color: (opacity = 1) =>
    `rgba(40, 82, 122, ${opacity})`,
  labelColor: (opacity = 1) =>
    `rgba(52, 64, 84, ${opacity})`,
  propsForBackgroundLines: {
    strokeDasharray: "",
    stroke: "#E3E8EF",
  },
};

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

  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 17,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E3E8EF",
    overflow: "hidden",
  },

  chartTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#172B4D",
    paddingHorizontal: 17,
  },

  chartDescription: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
    paddingHorizontal: 17,
    marginBottom: 8,
  },

  chart: {
    marginTop: 5,
    borderRadius: 10,
  },

  insightCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E3E8EF",
  },

  insightTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172B4D",
  },

  insightText: {
    fontSize: 13,
    color: "#667085",
    lineHeight: 20,
    marginTop: 6,
  },
});
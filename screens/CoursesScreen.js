import React, { useMemo, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
} from "react-native";

import { courses } from "../data/studentData";

export default function CoursesScreen() {
    const [searchText, setSearchText] = useState("");

    const filteredCourses = useMemo(() => {
        const search = searchText.trim().toLowerCase();

        if (search === "") {
            return courses;
        }

        return courses.filter((course) => {
            return (
                course.name.toLowerCase().includes(search) ||
                course.code.toLowerCase().includes(search)
            );
        });
    }, [searchText]);
    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>
                My Courses
            </Text>

            <Text style={styles.description}>
                Search your registered courses by name or course code.

            </Text>

            <TextInput
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search courses..."
                placeholderTextColor="#98A2B3"
            />

            <Text style={styles.resultCount}>
                {filteredCourses.length}{" "}
                {filteredCourses.length === 1
                    ? "course"
                    : "courses"}{" "}
                found
            </Text>

            {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                    <View
                        key={course.id}
                        style={styles.courseCard}
                    >
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
                            {/* {course.marks}% */}
                            </Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <View>
                                <Text style={styles.detailLabel}>
                                    Attendance
                                </Text>

                                <Text
                                    style={[
                                        styles.detailValue,
                                        course.attendance < 75 &&
                                        styles.lowAttendance,
                                    ]}
                                >
                                    {course.attendance}%
                                </Text>
                            </View>

                            <View style={styles.detailsRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Attendance
                                    </Text>

                                    <Text
                                        style={[
                                            styles.detailValue,
                                            course.attendance < 75 && styles.lowAttendance,
                                        ]}
                                    >
                                        {course.attendance}%
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {course.attendance < 75 && (
                            <View style={styles.warning}>
                                <Text style={styles.warningText}>
                                    ⚠ Low attendance
                                </Text>
                            </View>
                        )}
                    </View>
                ))
            ) : (
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyTitle}>
                        No courses found
                    </Text>

                    <Text style={styles.emptyText}>
                        Try searching with a different course name or
                        code.
                    </Text>
                </View>
            )}
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
        marginBottom: 18,
    },

    searchInput: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D0D5DD",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: "#172B4D",
        marginBottom: 10,
    },

    resultCount: {
        color: "#667085",
        fontSize: 12,
        marginBottom: 14,
    },

    courseCard: {
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
        color: "#667085",
        fontSize: 12,
        marginBottom: 4,
    },

    courseName: {
        color: "#172B4D",
        fontSize: 16,
        fontWeight: "600",
    },

    marks: {
        color: "#28527A",
        fontSize: 19,
        fontWeight: "700",
    },

    detailsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },

    detailLabel: {
        color: "#667085",
        fontSize: 11,
        marginBottom: 3,
    },

    detailValue: {
        color: "#344054",
        fontSize: 13,
        fontWeight: "600",
    },

    lowAttendance: {
        color: "#D92D20",
    },

    warning: {
        backgroundColor: "#FEF3F2",
        padding: 9,
        borderRadius: 8,
        marginTop: 12,
    },

    warningText: {
        color: "#B42318",
        fontSize: 12,
        fontWeight: "600",
    },

    emptyCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 20,
        borderWidth: 1,
        borderColor: "#E3E8EF",
        alignItems: "center",
    },

    emptyTitle: {
        color: "#172B4D",
        fontSize: 16,
        fontWeight: "700",
    },

    emptyText: {
        color: "#667085",
        fontSize: 13,
        textAlign: "center",
        marginTop: 6,
        lineHeight: 19,
    },
});
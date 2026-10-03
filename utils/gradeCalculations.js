export const gradeScale = [
  { grade: "F", min: 0 },
  { grade: "D", min: 50 },
  { grade: "D+", min: 54 },
  { grade: "C-", min: 58 },
  { grade: "C", min: 62 },
  { grade: "C+", min: 66 },
  { grade: "B-", min: 70 },
  { grade: "B", min: 74 },
  { grade: "B+", min: 78 },
  { grade: "A-", min: 82 },
  { grade: "A", min: 86 },
  { grade: "A+", min: 90 },
];

/*
  Returns the grade corresponding to a student's
  final absolute marks.
*/
export function getGradeFromABS(abs) {
  const matchingGrade = [...gradeScale]
    .reverse()
    .find((item) => abs >= item.min);

  return matchingGrade ? matchingGrade.grade : "F";
}


/*
  Calculates the ABS obtained from one assessment.

  Example:

  Assessment weight = 10 ABS
  Student obtained = 8 / 10

  ABS earned = 8 ABS
*/
export function getAssessmentABS(assessment) {
  if (!assessment.evaluated) {
    return 0;
  }

  if (assessment.total <= 0) {
    return 0;
  }

  return (
    (assessment.obtained / assessment.total) *
    assessment.weight
  );
}


/*
  Calculates the complete academic analysis
  for one course.
*/
export function getCourseAnalysis(course) {
  const evaluatedAssessments = course.assessments.filter(
    (assessment) => assessment.evaluated
  );

  const remainingAssessments = course.assessments.filter(
    (assessment) => !assessment.evaluated
  );

  /*
    How many ABS have been evaluated?
  */
  const absEvaluated = evaluatedAssessments.reduce(
    (sum, assessment) =>
      sum + assessment.weight,
    0
  );

  /*
    How many ABS are still remaining?
  */
  const absRemaining = remainingAssessments.reduce(
    (sum, assessment) =>
      sum + assessment.weight,
    0
  );

  /*
    How many ABS has the student actually earned?
  */
  const absObtained = evaluatedAssessments.reduce(
    (sum, assessment) =>
      sum + getAssessmentABS(assessment),
    0
  );

  /*
    Calculate the class average in ABS.
  */
  const classAverageABS = evaluatedAssessments.reduce(
    (sum, assessment) => {
      if (assessment.total <= 0) {
        return sum;
      }

      const classAverageABS =
        (assessment.classAverage /
          assessment.total) *
        assessment.weight;

      return sum + classAverageABS;
    },
    0
  );

  /*
    Current performance is the percentage
    of evaluated ABS that the student has earned.
  */
  const currentPerformance =
    absEvaluated > 0
      ? (absObtained / absEvaluated) * 100
      : 0;

  /*
    Class performance on the same evaluated ABS.
  */
  const classAveragePerformance =
    absEvaluated > 0
      ? (classAverageABS / absEvaluated) * 100
      : 0;

  const differenceFromClassAverage =
    currentPerformance -
    classAveragePerformance;

  /*
    Maximum possible final ABS if the student
    gets full marks in all remaining assessments.
  */
  const maximumPossibleABS =
    absObtained + absRemaining;

  /*
    Current grade based on ABS already obtained.

    This is informational only because the course
    is not necessarily fully evaluated yet.
  */
  const currentGrade =
    getGradeFromABS(absObtained);

  /*
    Calculate what percentage of the remaining
    assessments is required to reach each grade.
  */
  const gradeProjections = gradeScale
    .filter((item) => item.grade !== "F")
    .map((item) => {
      const additionalABS =
        item.min - absObtained;

      if (additionalABS <= 0) {
        return {
          grade: item.grade,
          requiredABS: 0,
          requiredRemainingPercentage: 0,
          achievable: true,
          alreadyReached: true,
        };
      }

      const requiredRemainingPercentage =
        absRemaining > 0
          ? (additionalABS / absRemaining) * 100
          : Infinity;

      return {
        grade: item.grade,
        requiredABS: additionalABS,
        requiredRemainingPercentage,
        achievable:
          additionalABS <= absRemaining,
        alreadyReached: false,
      };
    });

  return {
    evaluatedAssessments,
    remainingAssessments,

    absEvaluated,
    absObtained,
    absRemaining,

    classAverageABS,

    currentPerformance,
    classAveragePerformance,
    differenceFromClassAverage,

    currentGrade,
    maximumPossibleABS,

    gradeProjections,
  };
}
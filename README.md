# FLEX Insight

## Mobile Application Development — Assignment 1

FLEX Insight is a React Native mobile-first academic analysis application designed around a specific inconvenience faced by university students: university portals provide assessment data, but students often have to manually interpret that data to determine their current absolute marks (ABS), how much of the course has been evaluated, how much remains, how they compare with the class average, and what final grades are still achievable.

Rather than reproducing a university portal, FLEX Insight converts assessment data into actionable academic information.

## Problem

A student's course page can contain individual quizzes, assignments, midterms, projects, and examinations, but the raw assessment results do not necessarily answer the questions a student actually needs:

- How many ABS have been evaluated so far?
- How many ABS have I earned?
- How much evaluation remains?
- What is my current performance on evaluated work?
- How does my performance compare with the class average?
- What is the maximum final ABS I can still achieve?
- What ABS do I need in the remaining assessments to reach a particular grade?

Students may otherwise have to calculate these values manually.

## Solution

FLEX Insight provides a mobile interface that interprets assessment data and presents:

- ABS obtained out of ABS evaluated
- ABS remaining
- Current performance
- Class-average comparison
- Assessment-by-assessment breakdown
- Maximum possible final ABS
- Grade projections based on the remaining evaluation
- Attendance monitoring and an attendance calculator
- Course search
- Visual academic performance dashboard

The application uses course-specific assessment weights so different courses can have different evaluation structures.

## Core Features

### Academic Overview
- Student information
- CGPA
- Overall attendance
- Courses requiring attention
- Upcoming academic work
- Access to academic tools

### Attendance Analysis
- Attendance by course
- Low-attendance warnings
- Attendance calculator
- Input validation and feedback
- Calculation of consecutive classes required to reach 75%

### Marks Analysis
The central feature of FLEX Insight:
- ABS evaluated
- ABS obtained
- ABS remaining
- Current performance
- Class-average ABS
- Difference from class performance
- Maximum possible final ABS
- Current grade based on accumulated ABS
- Required ABS for each possible target grade

### Grade Projection

The application uses the following grading scheme:

| Grade | ABS Range |
|---|---:|
| F | < 50 |
| D | 50–<54 |
| D+ | 54–<58 |
| C- | 58–<62 |
| C | 62–<66 |
| C+ | 66–<70 |
| B- | 70–<74 |
| B | 74–<78 |
| B+ | 78–<82 |
| A- | 82–<86 |
| A | 86–<90 |
| A+ | 90+ |

The application dynamically determines whether a grade is already reached, achievable with the remaining evaluation, or impossible given the remaining ABS.

### Course Search
Search by course name, course code, or instructor. An empty state is shown when there are no matches.

### Performance Dashboard
Uses `react-native-chart-kit` with:
- Bar Chart — attendance by course
- Pie Chart — performance distribution

## React Native / JavaScript Concepts Demonstrated

- Functional React components
- Props
- `useState`
- `useMemo`
- Event handling
- Conditional rendering
- Arrays and objects
- `map()`
- `filter()`
- `reduce()`
- `find()`
- Data-driven UI
- Text inputs
- Input validation
- Empty and error states
- Reusable components
- Screen/view switching using React state
- Reusable calculation functions

## Project Structure

```text
FLEX-Insight/
│
├── components/
│   ├── CourseCard.js
│   ├── StatCard.js
│   ├── PerformanceCard.js
│   └── ...
│
├── data/
│   └── studentData.js
│
├── screens/
│   ├── AttendanceScreen.js
│   ├── MarksScreen.js
│   ├── MarksAnalysisScreen.js
│   ├── CoursesScreen.js
│   └── DashboardScreen.js
│
├── utils/
│   └── gradeCalculations.js
│
├── App.js
├── package.json
└── README.md
```

### Separation of responsibilities

- `data/` — application data
- `components/` — reusable presentation components
- `screens/` — screen-level UI and interaction
- `utils/` — reusable academic calculation logic
- `App.js` — top-level application view state

## Data Model

Each course contains its own assessment structure.

```javascript
{
  name: "Midterm 1",
  weight: 12.5,
  obtained: 10,
  total: 15,
  classAverage: 9,
  evaluated: true
}
```

This allows different courses to have different assessment weight distributions.

### ABS calculation

```text
ABS earned =
(obtained marks / total marks) × assessment weight

ABS evaluated =
sum of evaluated assessment weights

ABS remaining =
100 − ABS evaluated

Final ABS =
current ABS + ABS earned from remaining assessments
```

## Installation

### Requirements

- Node.js
- npm
- Expo
- Expo Go or another supported Expo development environment

### Install dependencies

```bash
npm install
```

### Start the application

On Windows:

```bash
npx.cmd expo start
```

Scan the QR code using Expo Go.

## Testing

Testing was performed in Expo/Expo Go and included:

- Valid attendance calculations
- Invalid attendance input
- Empty input
- Zero total classes
- Attended classes greater than total classes
- Course selection
- Course search
- Empty search results
- ABS calculations
- Remaining ABS calculations
- Class-average calculations
- Grade projection
- Maximum possible ABS
- Dashboard charts
- Mobile scrolling and interaction
- Dynamic changes to underlying course data

During development, a Safe Area configuration issue was encountered and resolved using `react-native-safe-area-context` and `SafeAreaProvider`.

## AI-Assisted Development

AI was used as a development assistant for ideation, React Native implementation guidance, debugging, UI/UX refinement, calculation logic, code organization, and documentation.

AI-generated output was reviewed, adapted, tested, and validated in the actual application. The final feature direction was determined by the identified student problem and the university's ABS grading model.

A separate AI Usage Report is included with the submission.

## Design Philosophy

FLEX Insight intentionally avoids unnecessary navigation and infrastructure. The application focuses on a small set of connected academic workflows:

```text
Raw assessment data
        ↓
ABS analysis
        ↓
Class comparison
        ↓
Remaining evaluation
        ↓
Grade projection
        ↓
Actionable academic understanding
```

The goal is to make information that students currently calculate manually immediately understandable on a mobile device.

## Submission

The project submission includes:

- Expo/React Native source code
- README/documentation
- Screenshots or demonstration video
- AI Usage Report
- GitHub repository containing the project and documentation

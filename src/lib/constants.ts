// Grades
export type Grades =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11 Science"
  | "11 Arts"
  | "11 Commerce"
  | "12 Science"
  | "12 Arts"
  | "12 Commerce";

const grades: Grades[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11 Science",
  "11 Arts",
  "11 Commerce",
  "12 Science",
  "12 Arts",
  "12 Commerce",
];

// Subjects
export type Subjects =
  | "English"
  | "Mathematics"
  | "Science (Physics, Chemistry, Biology)"
  | "Social Studies (History, Geography, Civics)"
  | "Hindi"
  | "Physical Education"
  | "Computer Science/Information Technology"
  | "Environmental Studies"
  | "Art & Craft"
  | "Music"
  | "Dance"
  | "Drama"
  | "Moral Science/Ethics"
  | "Foreign Language"
  | "Economics"
  | "Business Studies"
  | "Accountancy"
  | "Psychology"
  | "Sociology"
  | "Home Science"
  | "Work Experience/ Vocational Subjects";

const subjects: Subjects[] = [
  "English",
  "Mathematics",
  "Science (Physics, Chemistry, Biology)",
  "Social Studies (History, Geography, Civics)",
  "Hindi",
  "Physical Education",
  "Computer Science/Information Technology",
  "Environmental Studies",
  "Art & Craft",
  "Music",
  "Dance",
  "Drama",
  "Moral Science/Ethics",
  "Foreign Language",
  "Economics",
  "Business Studies",
  "Accountancy",
  "Psychology",
  "Sociology",
  "Home Science",
  "Work Experience/ Vocational Subjects",
];

// Verbs
export type Verbs =
  | "Recognise"
  | "Recall"
  | "Interpret"
  | "Exemplify"
  | "Classify"
  | "Summarise"
  | "Infer"
  | "Compare"
  | "Explain"
  | "Apply"
  | "Execute"
  | "Implement"
  | "Analyze"
  | "Differentiate"
  | "Organize"
  | "Attribute"
  | "Evaluate"
  | "Check"
  | "Critique"
  | "Create"
  | "Generate"
  | "Plan"
  | "Produce";

const verbs: Verbs[] = [
  "Recognise",
  "Recall",
  "Interpret",
  "Exemplify",
  "Classify",
  "Summarise",
  "Infer",
  "Compare",
  "Explain",
  "Apply",
  "Execute",
  "Implement",
  "Analyze",
  "Differentiate",
  "Organize",
  "Attribute",
  "Evaluate",
  "Check",
  "Critique",
  "Create",
  "Generate",
  "Plan",
  "Produce",
];

// Nature
export type Nature = "Group" | "Individual";

const natures: Nature[] = ["Group", "Individual"];

// Values
export type Values = "Honesty" | "Punctuality" | "Politeness" | "Truthfulness";

const values: Values[] = [
  "Honesty",
  "Punctuality",
  "Politeness",
  "Truthfulness",
];

// Questions format
export type Formats =
  | "MCQ"
  | "Short Answer"
  | "Long Answer"
  | "Statement Based"
  | "Fillups"
  | "True/False";

const formats: Formats[] = [
  "MCQ",
  "Short Answer",
  "Long Answer",
  "Statement Based",
  "Fillups",
  "True/False",
];

// Difficulty level
export type Levels = "Easy" | "Medium" | "Hard" | "Mix";

const levels: Levels[] = ["Easy", "Medium", "Hard", "Mix"];

export type Simplify = "Example" | "Explanation" | "Activity";

const simplifies: Simplify[] = ["Example", "Explanation", "Activity"];

export {
  grades,
  subjects,
  verbs,
  natures,
  values,
  formats,
  levels,
  simplifies,
};

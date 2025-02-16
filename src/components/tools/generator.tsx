"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Formats,
  Grades,
  grades,
  Levels,
  levels,
  Nature,
  Resources,
  Simplify,
  Subjects,
  subjects,
  Values,
  Verbs,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VerbMultiSelect, {
  FormatMultiSelect,
} from "@/components/tools/multi-select";
import Output from "@/components/tools/output";

type GeneratorProps = {
  tool:
    | "Lesson Plan Generator"
    | "Worksheet Generator"
    | "Activity Generator"
    | "Concept Simplifier"
    | "Feedback Generator";
};

export default function Generator({ tool }: GeneratorProps) {
  const { user } = useUser();

  const [grade, setGrade] = useState<Grades | null>(null);
  const [subject, setSubject] = useState<Subjects | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [selectedVerbs, setSelectedVerbs] = useState<Verbs[]>([]);
  const [number, setNumber] = useState<string>("");
  const [selectedFormats, setSelectedFormats] = useState<Formats[]>([]);
  const [level, setLevel] = useState<Levels | null>(null);

  const [nature, setNature] = useState<Nature | null>(null);

  const [skill, setSkill] = useState("");
  const [values, setValues] = useState<Values | null>(null);

  const [resources, setResources] = useState<Resources | null>(null);

  const [format, setFormat] = useState<Simplify | null>(null);
  const [concept, setConcept] = useState<string>("");
  const [explain, setExplain] = useState<string>("");
  const [focusAspect, setFocusAspect] = useState<string>("");

  const [studentName, setStudentName] = useState<string>("");
  const [strength, setStrength] = useState<string>("");
  const [growth, setGrowth] = useState<string>("");

  const [completion, setCompletion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [complete, setComplete] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [download, setDownload] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  let prompt: string;

  if (tool === "Lesson Plan Generator") {
    prompt = `You are a teacher in an Indian school in a grade ${grade} class, teaching ${subject}. Your lesson objective for students is to ${selectedVerbs
      .map((verb: any) => verb.value)
      .join(",")} ${topic}. You are making a lesson plan for this class.
    Use only the following format:
    Lesson Objective:
    Opening
    Introduction to New Material
    Potential misunderstandings
    Guided Practice
    Independent Practice
    Closing
    Include all the following points in each corresponding section of the lesson plan:
    Under Lesson Objective Introduce the objective to the students and why they are learning it?
    Under Opening- Include a grade appropriate interesting hook for students’ attention. Also add what is the relevance of this lesson in the lives of students studying in schools in India. Do not give an explanation. Only give the relevance through examples or anecdotes that might make the lesson interesting for students.
    Under Introduction of New Material- Introduce the key information of this lesson in a way students can actively take this information in. Give recommendations of how, what and why should be taught in this class for best understanding. You are teaching in an Indian classroom, have options of examples that can be used while explaining the above mentioned objective. Include examples for each key point. - Within this section Include what are some potential misunderstandings students might have. Give examples that you would use to mitigate these misunderstandings. Also include a list of 5 ways in which you will engage students in this lesson.
      Under Guided Practice- List 5 ways in which you can help students practice the lesson objective. Give 2 options which need no resources, and give other options that need minimum resources. Give scaffolded practice exercises from easy to hard. Include a mix of group activities, individual activities, practical activities that do not need a lot of additional resources and can be done without computers or mobiles.
      Under Independent Practice- Make a list of 10 scaffolded questions that will help you evaluate student understanding. Make sure these questions are across different rigor levels.  Include a mix of MCQs, and normal Q&As
      Under Closing- Give me 3 options to make students summarize and recap what they learned in this class. Make sure you help students make connections between what they learnt in the lesson and in their life. Remember these students belong to schools in Indian urban cities.
      Give a suitable time for each section such that the class can be done in 45 minutes.
      Give the output only in the following format:
    Lesson Objective:
    Opening
    Introduction to New Material
    Potential misunderstandings
    Guided Practice
    Independent Practice
    Closing
    Keep the above points in the same order. Each section should be as detailed as possible with great amount and quality of content, including examples, bullet points wherever possible. add at least 5 points for each section.
    `;
  } else if (tool === "Worksheet Generator") {
    prompt = `You are a teacher in an Indian school in a grade ${grade} class, teaching ${subject}. Your lesson objective for students is to ${selectedVerbs
      .map((verb: any) => verb.value)
      .join(
        ","
      )} ${topic}. You are making scaffolded practice questions for this class.
    As an AI, generate diverse, thought-provoking questions based on the above data in format of ${selectedFormats
      .map((format: any) => format.value)
      .join(
        ","
      )}. The questions should be of ${level} difficulty, with the complexity of the answer reflecting its difficulty. Aim to stimulate diverse answers and deepen subject comprehension.
    Provide an answer key for each question, highlighting main concepts required for a complete response. Be creative and aim to spark dynamic responses and deepen understanding of the topics.
    Generate ${number} questions.
    Keep the format strictly like this:
    Initially all the questions should be generated strictly in the format like:
    Question 1:
    Question 2:
    etc
  
    After all the questions are generated, generate the answer key each question at the end strictly in the format like this:
    Answer Key:
  
    After the answer key, generate the key concepts required for each answer above strictly in the format like this:
    Key Concepts:
  
    Follow the above format strictly at all costs for any type of question format.
    `;
  } else if (tool === "Activity Generator") {
    prompt = `You are a teacher. You teach ${subject} subject to a grade ${grade} classroom in a school located in India. Your lesson topic for students is to ${selectedVerbs
      .map((verb: any) => verb.value)
      .join(",")} ${topic}.
    For the above topic, please plan ${number} ${nature} activities for the students in your class. Ensure that the activities give students an opportunity to make use of ${skill} skills and are rooted in the values of ${values}. The classroom has the following resources- ${resources}, make sure the activities are designed using these resources and do not recommend any other resources.
      Keep the format strictly like this:
      Activity Title:
      One line description of the activity:
      Resources:
      Instructions for students:
    `;
  } else if (tool === "Concept Simplifier") {
    prompt = `You are a teacher in India who wants to simplify a tough concept in a way that is easy for students to understand. Please simplify ${explain} which is a concept under ${concept} using ${format} appropriate for learners in class ${grade}. Give 5 ways in which this topic/concept can be simplified for this audience. Limit each method to 5 lines.
  Optional- Make sure the simplified explanations focus on simplifying ${focusAspect}
  `;
  } else if (tool === "Feedback Generator") {
    prompt = `You are a teacher. You are writing constructive feedback for your student with 3 clear next steps for the student to follow. The name of the students is ${studentName} and is a student of grade [grade] classroom in a school located in India. ${studentName} has ${strength} as his Areas of Strengths and ${growth} as things he needs to improve on.
  Write constructive feedback for ${studentName} and outlining 3 clear next steps for them to follow. Keep the feedback under 5 lines.
  Keep the format strictly as follows:
  Feedback-
  Next steps-
  `;
  }

  const handleSubmit = async () => {
    if (tool === "Activity Generator") {
      if (!grade) {
        toast.error("Please select a grade!");
        return;
      }
    } else if (tool === "Concept Simplifier") {
      if (!grade) {
        toast.error("Please select a grade!");
        return;
      }
    } else if (tool === "Feedback Generator") {
      if (!grade) {
        toast.error("Please select a grade!");
        return;
      }
    } else {
      if (!grade) {
        toast.error("Please select a grade!");
        return;
      } else if (!subject) {
        toast.error("Please select a subject!");
        return;
      } else if (!topic) {
        toast.error("Please enter a topic!");
        return;
      } else if (selectedVerbs.length === 0) {
        toast.error("Please select a verb!");
        return;
      } else if (!number) {
        toast.error("Please enter number of questions!");
        return;
      } else if (selectedFormats.length === 0) {
        toast.error("Please enter a question format!");
        return;
      } else if (!level) {
        toast.error("Please enter a difficulty level!");
        return;
      }
    }

    setLoading(true);
    setCompletion("");

    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = response.body;
    if (!data) {
      console.log("No data");
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setCompletion((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  let formattedOutput: React.JSX.Element[];

  if (tool === "Lesson Plan Generator") {
    formattedOutput = completion
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map((line, index) => {
        if (line.startsWith("Lesson Objective:")) {
          return (
            <div key={index}>
              <p className="mt-2 font-bold">Lesson Objective:</p>
              {line.split("Lesson Objective:")[1].trim()}
            </div>
          );
        } else if (line.startsWith("Opening:")) {
          return (
            <div key={index}>
              <p className="mt-2 font-bold">Opening:</p>
              {line.split("Opening:")[1].trim()}
            </div>
          );
        } else if (line.startsWith("Introduction to New Material:")) {
          return (
            <div key={index}>
              <p className="mt-2 font-bold">Introduction to New Material:</p>
              {line.split("Introduction to New Material:")[1].trim()}
            </div>
          );
        } else if (line.startsWith("Guided Practice:")) {
          return (
            <div key={index}>
              <p className="mt-2 font-bold">Guided Practice:</p>
              {line.split("Guided Practice:")[1].trim()}
            </div>
          );
        } else if (line.startsWith("Independent Practice:")) {
          return (
            <div key={index}>
              <p className="mt-2 font-bold">Independent Practice:</p>
              <ul>
                {/* {formattedOutput.slice(index + 1)
                  .map((strategy: any, strategyIndex: any) => {
                    if (strategy.startsWith('- ')) {
                      return <li key={strategyIndex}>{strategy.replace('-', '').trim()}</li>
                    } else {
                      return null
                    }
                  })} */}
                {line.split("Independent Practice:")[1].trim()}
              </ul>
            </div>
          );
        } else if (line.startsWith("Closing:")) {
          return (
            <div key={index}>
              <p className="mt-2 font-bold">Closing:</p>
              <ul>{line.split("Closing:")[1].trim()}</ul>
            </div>
          );
        } else {
          return <p key={index}>{line}</p>;
        }
      });
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-6xl">
        {tool}
      </h1>

      <div className="w-full max-w-2xl">
        {(tool === "Lesson Plan Generator" ||
          tool === "Worksheet Generator") && (
          <div>
            <div>
              <div id="grade-div">
                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary size-4 rounded-full" />
                    <p className="text-xl font-semibold">Grade</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Select onValueChange={(grade: Grades) => setGrade(grade)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {grades.map((grade) => (
                          <SelectItem key={grade} value={grade.toString()}>
                            <SelectLabel>{grade}</SelectLabel>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div id="subject-div">
                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary size-4 rounded-full" />
                    <p className="text-xl font-semibold">Subject</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Select onValueChange={(e: any) => setSubject(e)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            <SelectLabel>{subject}</SelectLabel>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div id="topic-div">
                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary size-4 rounded-full" />
                    <p className="text-xl font-semibold">Topic</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Input
                    type="text"
                    placeholder="Enter a topic for the choosen subject"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              </div>
              <div id="bloom-div">
                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary size-4 rounded-full" />
                    <p className="text-xl font-semibold">
                      Bloom Verb Selection
                    </p>
                  </div>
                  <div className="mt-3"></div>
                  <VerbMultiSelect
                    selectedOptions={selectedVerbs}
                    setSelectedOptions={setSelectedVerbs}
                  />
                </div>
              </div>
              <div id="question-number-div">
                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary size-4 rounded-full" />
                    <p className="text-xl font-semibold">Number of Questions</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Input
                    type="text"
                    placeholder="Enter number of questions"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
              <div id="format-div">
                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary size-4 rounded-full" />
                    <p className="text-xl font-semibold">Question Format</p>
                  </div>
                </div>
                <div className="mt-3">
                  <FormatMultiSelect
                    selectedOptions={selectedFormats}
                    setSelectedOptions={setSelectedFormats}
                  />
                </div>
              </div>
              <div id="levels-div">
                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary size-4 rounded-full" />
                    <p className="text-xl font-semibold">Difficulty Level</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Select onValueChange={(e: any) => setLevel(e)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level.toString()}>
                            <SelectLabel>{level}</SelectLabel>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleSubmit()}
              className="mt-8 h-11 w-full text-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" /> Generating{" "}
                  {tool === "Lesson Plan Generator"
                    ? "Lesson Plan"
                    : "Worksheet"}
                  {/* {tool === "Worksheet Generator" && "Worksheet"}
                  {tool === "Activity Generator" && "Activity"}
                  {tool === "Concept Simplifier" && "Simplification"}
                  {tool === "Feedback Generator" && "Feedback"} */}
                </>
              ) : (
                <>
                  Generate{" "}
                  {tool === "Lesson Plan Generator"
                    ? "Lesson Plan"
                    : "Worksheet"}
                  {/* {tool === "Worksheet Generator" && "Worksheet"}
                  {tool === "Activity Generator" && "Activity"}
                  {tool === "Concept Simplifier" && "Simplification"}
                  {tool === "Feedback Generator" && "Feedback"} */}
                </>
              )}
            </Button>
          </div>
        )}

        <Output
          disabled={!save}
          output={completion as string}
          editedOutput={setCompletion}
          edit={isEdit}
          saveButton={save}
          // data={data}
          setSave={setSave}
          title={topic}
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Formats,
  Grades,
  grades,
  Levels,
  levels,
  Nature,
  natures,
  simplifies,
  Simplify,
  Subjects,
  subjects,
  Values,
  values,
  Verbs,
} from "@/lib/constants";
import { GeneratorProps } from "@/lib/types";
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
import { Textarea } from "@/components/ui/textarea";
import VerbMultiSelect, {
  FormatMultiSelect,
} from "@/components/tools/multi-select";
import Output from "@/components/tools/output";

export default function Generator({ tool }: GeneratorProps) {
  const [grade, setGrade] = useState<Grades | null>(null);
  const [subject, setSubject] = useState<Subjects | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [selectedVerbs, setSelectedVerbs] = useState<Verbs[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [selectedFormats, setSelectedFormats] = useState<Formats[]>([]);
  const [level, setLevel] = useState<Levels | null>(null);
  const [format, setFormat] = useState<Simplify | null>(null);
  const [nature, setNature] = useState<Nature | null>(null);
  const [skill, setSkill] = useState<string>("");
  const [value, setValue] = useState<Values | null>(null);
  const [resources, setResources] = useState<string>("");
  const [simplify, setSimplify] = useState<Simplify | null>(null);
  const [concept, setConcept] = useState<string>("");
  const [explain, setExplain] = useState<string>("");
  const [focusAspect, setFocusAspect] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [strength, setStrength] = useState<string>("");
  const [growth, setGrowth] = useState<string>("");

  const [completion, setCompletion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [complete, setComplete] = useState<boolean>(false);

  const validateInputs = (): boolean => {
    if (!grade) {
      toast.error("Please select a grade!");
      return false;
    }

    if (tool === "lesson-plan-generator" || tool === "worksheet-generator") {
      if (!subject) {
        toast.error("Please select a subject!");
        return false;
      }
      if (!topic) {
        toast.error("Please enter a topic!");
        return false;
      }
      if (selectedVerbs.length === 0) {
        toast.error("Please select a verb!");
        return false;
      }
      if (!number) {
        toast.error("Please enter number of questions!");
        return false;
      }
      if (selectedFormats.length === 0) {
        toast.error("Please enter a question format!");
        return false;
      }
      if (!level) {
        toast.error("Please enter a difficulty level!");
        return false;
      }
    } else if (tool === "activity-generator") {
      if (!subject) {
        toast.error("Please select a subject!");
        return false;
      }
      if (!topic) {
        toast.error("Please enter a topic!");
        return false;
      }
      if (selectedVerbs.length === 0) {
        toast.error("Please select a verb!");
        return false;
      }
      if (!number) {
        toast.error("Please enter number of activities!");
        return false;
      }
      if (selectedFormats.length === 0) {
        toast.error("Please enter an activity format!");
        return false;
      }
      if (!nature) {
        toast.error("Please select the nature of the activity!");
        return false;
      }
      if (!resources) {
        toast.error("Please enter resources!");
        return false;
      }
      if (!skill) {
        toast.error("Please enter a focus skill!");
        return false;
      }
    } else if (tool === "concept-simplifier") {
      if (!simplify) {
        toast.error("Please select the simplification format!");
        return false;
      }
      if (!concept) {
        toast.error("Please enter a concept to simplify!");
        return false;
      }
      if (!explain) {
        toast.error("Please enter what you want to explain!");
        return false;
      }
    } else if (tool === "feedback-generator") {
      if (!studentName) {
        toast.error("Please enter the student name!");
        return false;
      }
      if (!strength) {
        toast.error("Please enter areas of strength!");
        return false;
      }
      if (!growth) {
        toast.error("Please enter areas of growth!");
        return false;
      }
    } else {
      toast.error("Invalid tool selection!");
      return false;
    }

    // All checks passed
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    setCompletion("");
    setComplete(false);

    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tool,
        grade,
        subject,
        selectedVerbs,
        topic,
        selectedFormats,
        format,
        level,
        number,
        nature,
        skill,
        value,
        resources,
        focusAspect,
        concept,
        explain,
        strength,
        growth,
        studentName,
      }),
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
    setComplete(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-center text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
        {tool
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h1>

      <div className="w-full max-w-2xl">
        <div>
          <div>
            <div id="grade-div">
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <span className="bg-primary size-3 rounded-full" />
                  <p className="text-lg font-semibold">Grade</p>
                </div>
              </div>
              <div className="mt-2">
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
            {(tool === "lesson-plan-generator" ||
              tool === "worksheet-generator" ||
              tool === "activity-generator") && (
              <>
                <div id="subject-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Subject</p>
                    </div>
                  </div>
                  <div className="mt-2">
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
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Topic</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      type="text"
                      placeholder="Enter a topic for the choosen subject"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                </div>

                <div id="bloom-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">
                        Bloom Verb Selection
                      </p>
                    </div>
                    <div className="mt-2"></div>
                    <VerbMultiSelect
                      selectedOptions={selectedVerbs}
                      setSelectedOptions={setSelectedVerbs}
                    />
                  </div>
                </div>
              </>
            )}
            {(tool === "lesson-plan-generator" ||
              tool === "worksheet-generator") && (
              <>
                <div id="question-number-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">
                        Number of Questions
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      type="number"
                      placeholder="Enter number of questions"
                      value={number}
                      onChange={(e) => setNumber(Number(e.target.value))}
                      min={0}
                      step={1}
                    />
                  </div>
                </div>

                <div id="format-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Question Format</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <FormatMultiSelect
                      selectedOptions={selectedFormats}
                      setSelectedOptions={setSelectedFormats}
                    />
                  </div>
                </div>

                <div id="levels-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Difficulty Level</p>
                    </div>
                  </div>
                  <div className="mt-2">
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
              </>
            )}
            {tool === "activity-generator" && (
              <>
                <div id="nature-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">
                        Nature of Activity
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Select onValueChange={(value: Nature) => setNature(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nature of activity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {natures.map((nature) => (
                            <SelectItem key={nature} value={nature.toString()}>
                              <SelectLabel>{nature}</SelectLabel>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div id="nature-number-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">
                        Number of Activities
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      type="number"
                      placeholder="Enter number of questions"
                      value={number}
                      onChange={(e) => setNumber(Number(e.target.value))}
                      min={0}
                      step={1}
                    />
                  </div>
                </div>

                <div id="resources-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Resources</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      type="text"
                      placeholder="Internet, Chart Paper, Computer etc."
                      required
                      value={resources}
                      onChange={(e) => setResources(e.target.value)}
                    />
                  </div>
                </div>

                <div id="skill-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Focus Skill</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      type="text"
                      placeholder="Eg: Communication, Collaboration, Creativity, Critical Thinking etc."
                      required
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                  </div>
                </div>

                <div id="value-div">
                  <div className="mt-6 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Focus Value</p>
                    </div>
                    <p className="text-primary/60 font-medium">(Optional)</p>
                  </div>
                  <div className="mt-2">
                    <Select onValueChange={(value: Values) => setValue(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select focus value" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {values.map((value) => (
                            <SelectItem key={value} value={value.toString()}>
                              <SelectLabel>{value}</SelectLabel>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {tool === "concept-simplifier" && (
              <>
                <div id="simplify-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Simplify using</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Select
                      onValueChange={(simplify: Simplify) =>
                        setSimplify(simplify)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {simplifies.map((simplify) => (
                            <SelectItem
                              key={simplify}
                              value={simplify.toString()}
                            >
                              <SelectLabel>{simplify}</SelectLabel>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div id="concept-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Concept</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Textarea
                      rows={4}
                      placeholder="Enter concept to simplify"
                      required
                      value={concept}
                      onChange={(e) => setConcept(e.target.value)}
                    />
                  </div>
                </div>
                <div id="explain-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">
                        What do you want to explain?
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Textarea
                      rows={4}
                      placeholder="Enter what you want to explain"
                      required
                      value={explain}
                      onChange={(e) => setExplain(e.target.value)}
                    />
                  </div>
                </div>
                <div id="focus-aspect-div">
                  <div className="mt-6 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 shrink-0 rounded-full" />
                      <p className="text-lg font-semibold">
                        Do you want to simplify something particular?
                      </p>
                    </div>

                    <p className="text-primary/60 font-medium">(Optional)</p>
                  </div>
                  <div className="mt-2">
                    <Textarea
                      rows={4}
                      placeholder="Enter what you want to simplify particularly"
                      value={focusAspect}
                      onChange={(e) => setFocusAspect(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {tool === "feedback-generator" && (
              <>
                <div id="studentname-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Student Name</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      type="text"
                      placeholder="Enter student name"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                  </div>
                </div>
                <div id="strength-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Areas of Strength</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Textarea
                      rows={4}
                      placeholder="Enter areas of strength"
                      required
                      value={strength}
                      onChange={(e) => setStrength(e.target.value)}
                    />
                  </div>
                </div>
                <div id="growth-div">
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary size-3 rounded-full" />
                      <p className="text-lg font-semibold">Areas of Growth</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Textarea
                      rows={4}
                      placeholder="Enter areas of growth"
                      required
                      value={growth}
                      onChange={(e) => setGrowth(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <Button
            onClick={() => handleSubmit()}
            className="mt-8 h-11 w-full text-lg"
            disabled={loading}
          >
            <>
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" /> Generating
                </>
              ) : (
                "Generate "
              )}
              {tool === "lesson-plan-generator" && "Lesson Plan"}
              {tool === "worksheet-generator" && "Worksheet"}
              {tool === "activity-generator" && "Activity"}
              {tool === "concept-simplifier" && "Simplification"}
              {tool === "feedback-generator" && "Feedback"}
            </>
          </Button>
        </div>

        <Output output={completion as string} title={topic} complete={complete} />
      </div>
    </div>
  );
}

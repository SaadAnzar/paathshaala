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
import Output, { WorksheetOutput } from "@/components/tools/output";

import { Textarea } from "../ui/textarea";

export default function FeedbackGeneratorPage() {
  const { user } = useUser();

  const [grade, setGrade] = useState<Grades | null>(null);
  const [studentName, setStudentName] = useState<string>("");
  const [strength, setStrength] = useState<string>("");
  const [growth, setGrowth] = useState<string>("");

  const [completion, setCompletion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [save, setSave] = useState<boolean>(false);
  const [download, setDownload] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const prompt: string = `You are a teacher. You are writing constructive feedback for your student with 3 clear next steps for the student to follow. The name of the students is ${studentName} and is a student of grade [grade] classroom in a school located in India. ${studentName} has ${strength} as his Areas of Strengths and ${growth} as things he needs to improve on.
  Write constructive feedback for ${studentName} and outlining 3 clear next steps for them to follow. Keep the feedback under 5 lines.
  Keep the format strictly as follows:
  Feedback:
  Next steps:
  `;

  const handleSubmit = async () => {
    if (!grade) {
      toast.error("Please select a grade!");
      return;
    } else if (!studentName) {
      toast.error("Please enter a student name!");
      return;
    } else if (!strength) {
      toast.error("Please enter areas of strength!");
      return;
    } else if (!growth) {
      toast.error("Please enter areas for growth!");
      return;
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

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-6xl">
        Feedback Generator
      </h1>

      <div className="w-full max-w-2xl">
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
            <div id="studentname-div">
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <span className="bg-primary size-4 rounded-full" />
                  <p className="text-xl font-semibold">Student Name</p>
                </div>
              </div>
              <div className="mt-3">
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
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <span className="bg-primary size-4 rounded-full" />
                  <p className="text-xl font-semibold">Areas of Strength</p>
                </div>
              </div>
              <div className="mt-3">
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
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <span className="bg-primary size-4 rounded-full" />
                  <p className="text-xl font-semibold">Areas of Growth</p>
                </div>
              </div>
              <div className="mt-3">
                <Textarea
                  rows={4}
                  placeholder="Enter areas of growth"
                  required
                  value={growth}
                  onChange={(e) => setGrowth(e.target.value)}
                />
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
                <Loader2 className="mr-2 size-5 animate-spin" /> Generating
                Feedback
              </>
            ) : (
              "Generate Feedback"
            )}
          </Button>
        </div>

        <Output
          disabled={!save}
          output={completion as string}
          editedOutput={setCompletion}
          edit={isEdit}
          saveButton={save}
          // data={data}
          setSave={setSave}
          title={studentName}
        />
      </div>
    </div>
  );
}

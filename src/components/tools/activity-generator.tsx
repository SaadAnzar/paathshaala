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
  values,
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

export default function ActivityGeneratorPage() {
  const { user } = useUser();

  const [grade, setGrade] = useState<Grades | null>(null);
  const [subject, setSubject] = useState<Subjects | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [selectedVerbs, setSelectedVerbs] = useState<Verbs[]>([]);
  const [nature, setNature] = useState<Nature | null>(null);
  const [number, setNumber] = useState<string>("");
  const [resources, setResources] = useState<string>("");
  const [skill, setSkill] = useState<string>("");
  const [value, setValue] = useState<Values | null>(null);

  const [completion, setCompletion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [complete, setComplete] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [download, setDownload] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const prompt: string = `You are a teacher. You teach ${subject} subject to a grade ${grade} classroom in a school located in India. Your lesson topic for students is to ${selectedVerbs
    .map((verb: any) => verb.value)
    .join(",")} ${topic}.
    For the above topic, please plan ${number} ${nature} activities for the students in your class. Ensure that the activities give students an opportunity to make use of ${skill} skills and are rooted in the values of ${values}. The classroom has the following resources- ${resources}, make sure the activities are designed using these resources and do not recommend any other resources.
      Keep the format strictly like this:
      Activity Title:
      One line description of the activity:
      Resources:
      Instructions for students:
    `;

  const handleSubmit = async () => {
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
    } else if (!nature) {
      toast.error("Please select nature of activity!");
      return;
    } else if (!number) {
      toast.error("Please enter number of activities!");
      return;
    } else if (!resources) {
      toast.error("Please select resource!");
      return;
    } else if (!skill) {
      toast.error("Please enter focus skill!");
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
        Activity Generator
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
                  <p className="text-xl font-semibold">Bloom Verb Selection</p>
                </div>
                <div className="mt-3"></div>
                <VerbMultiSelect
                  selectedOptions={selectedVerbs}
                  setSelectedOptions={setSelectedVerbs}
                />
              </div>
            </div>
            <div id="resources-div">
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <span className="bg-primary size-4 rounded-full" />
                  <p className="text-xl font-semibold">Resources</p>
                </div>
              </div>
              <div className="mt-3">
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
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <span className="bg-primary size-4 rounded-full" />
                  <p className="text-xl font-semibold">Focus Skill</p>
                </div>
              </div>
              <div className="mt-3">
                <Input
                  type="text"
                  placeholder="Eg: Communication, Collaboration, Creativity, Critical Thinking etc."
                  required
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />
              </div>
            </div>
            <div id="values-div">
              <div className="mt-8 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary size-4 rounded-full" />
                  <p className="text-xl font-semibold">Focus Value</p>
                </div>
                <p className="text-primary/60 text-lg font-medium">
                  (Optional)
                </p>
              </div>
              <div className="mt-3">
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
          </div>

          <Button
            onClick={() => handleSubmit()}
            className="mt-8 h-11 w-full text-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" /> Generating
                Activity
              </>
            ) : (
              "Generate Activity"
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
          title={topic}
        />
      </div>
    </div>
  );
}

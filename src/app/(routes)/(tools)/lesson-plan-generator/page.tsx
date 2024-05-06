"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

import { grades, levels, subjects } from "@/lib/constants";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VerbMultiSelect, {
  FormatMultiSelect,
} from "@/components/tools/multi-select";
import Output, { WorksheetOutput } from "@/components/tools/output";

export default function LessonPlanGenerator() {
  const [grade, setGrade] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [selectedVerbs, setSelectedVerbs] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [level, setLevel] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [rating, setRating] = useState(false);
  const [choice, setChoice] = useState(false);
  const [completion, setCompletion] = useState<string>("");
  const [worksheet, setWorksheet] = useState<string>("");
  const [slides, setSlides] = useState<string>("");
  const [complete, setComplete] = useState(false);
  const [save, setSave] = useState(false);
  const [download, setDownload] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [isEditWorksheet, setIsEditWorksheet] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-6xl">
        Lesson Plan Generator
      </h1>

      <div className="w-full max-w-2xl">
        <div id="grade-div">
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <span className="bg-primary size-4 rounded-full" />
              <p className="text-xl font-semibold">Grade</p>
            </div>
          </div>
          <div className="mt-3">
            <Select onValueChange={(e: string) => setGrade(e)}>
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
              required
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
              required
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

        {!loading && (
          <div className="flex gap-3">
            <Button
              // onClick={(e) => checkInputs(e)}
              onClick={() => {
                setLoading(true);
                console.log({
                  grade,
                  topic,
                  level,
                  subject,
                  selectedVerbs,
                  selectedFormats,
                  number,
                });
              }}
              className="mt-8 w-full text-lg"
            >
              Generate Lesson Plan
            </Button>
          </div>
        )}
        {loading && (
          <button
            className="mt-8 w-full rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
            disabled
          >
            <Loader className="animate-spin" />
          </button>
        )}

        <div className="mt-5 flex w-full flex-col justify-center">
          <Tabs defaultValue="lesson-plan">
            <TabsList className="bg-primary grid h-11 w-full grid-cols-2">
              <TabsTrigger
                className="text-primary-foreground py-1 text-lg font-semibold tracking-tighter"
                value="lesson-plan"
              >
                Lesson Plan
              </TabsTrigger>
              <TabsTrigger
                className="text-primary-foreground py-1 text-lg font-semibold tracking-tighter"
                value="worksheet"
              >
                Worksheet
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="lesson-plan"
              className="space-y-4 focus:ring-0 focus-visible:ring-0"
            >
              {completion && (
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
              )}
            </TabsContent>
            <TabsContent
              value="worksheet"
              className="space-y-4 focus:ring-0 focus-visible:ring-0"
            >
              {worksheet && (
                <WorksheetOutput
                  disabled={!download}
                  output={worksheet as string}
                  editedOutput={setWorksheet}
                  edit={isEditWorksheet}
                  saveButton={save}
                  // data={data}
                  setSave={setSave}
                  title={topic}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

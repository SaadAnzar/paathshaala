"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Grades, grades, simplifies, Simplify } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Output from "@/components/tools/output";

import { Textarea } from "../ui/textarea";

export default function ConceptSimplifierPage() {
  const { user } = useUser();

  const [grade, setGrade] = useState<Grades | null>(null);

  const [simplify, setSimplify] = useState<Simplify | null>(null);
  const [concept, setConcept] = useState<string>("");
  const [explain, setExplain] = useState<string>("");
  const [focusAspect, setFocusAspect] = useState<string>("");

  const [completion, setCompletion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [save, setSave] = useState<boolean>(false);
  const [download, setDownload] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const prompt: string = `You are a teacher in India who wants to simplify a tough concept in a way that is easy for students to understand. Please simplify ${explain} which is a concept under ${concept} using ${simplify} appropriate for learners in class ${grade}. Give 5 ways in which this topic/concept can be simplified for this audience. Limit each method to 5 lines.
  Optional- Make sure the simplified explanations focus on simplifying ${focusAspect}
  `;

  const handleSubmit = async () => {
    if (!grade) {
      toast.error("Please select a grade!");
      return;
    } else if (!simplify) {
      toast.error("Please select a simplify format!");
      return;
    } else if (!concept) {
      toast.error("Please enter some concept!");
      return;
    } else if (!explain) {
      toast.error("Please enter what you want to explain!");
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
        Concept Simplifier
      </h1>

      <div className="w-full max-w-2xl">
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
          <div id="simplify-div">
            <div className="mt-8">
              <div className="flex items-center gap-2">
                <span className="bg-primary size-4 rounded-full" />
                <p className="text-xl font-semibold">Simplify using</p>
              </div>
            </div>
            <div className="mt-3">
              <Select
                onValueChange={(simplify: Simplify) => setSimplify(simplify)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {simplifies.map((simplify) => (
                      <SelectItem key={simplify} value={simplify.toString()}>
                        <SelectLabel>{simplify}</SelectLabel>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div id="concept-div">
            <div className="mt-8">
              <div className="flex items-center gap-2">
                <span className="bg-primary size-4 rounded-full" />
                <p className="text-xl font-semibold">Concept</p>
              </div>
            </div>
            <div className="mt-3">
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
            <div className="mt-8">
              <div className="flex items-center gap-2">
                <span className="bg-primary size-4 rounded-full" />
                <p className="text-xl font-semibold">
                  What do you want to explain?
                </p>
              </div>
            </div>
            <div className="mt-3">
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
            <div className="mt-8 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-primary size-4 shrink-0 rounded-full" />
                <p className="text-xl font-semibold">
                  Do you want to simplify something particular?
                </p>
              </div>

              <p className="text-primary/60 text-lg font-medium">(Optional)</p>
            </div>
            <div className="mt-3">
              <Textarea
                rows={4}
                placeholder="Enter what you want to simplify particularly"
                value={focusAspect}
                onChange={(e) => setFocusAspect(e.target.value)}
              />
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
                Simplification
              </>
            ) : (
              "Generate Simplification"
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
          title={concept}
        />
      </div>
    </div>
  );
}

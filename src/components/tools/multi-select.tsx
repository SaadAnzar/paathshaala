"use client";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const verbs = [
  { value: "Recognise", label: "Recognise", color: "#000" },
  { value: "Recall", label: "Recall", color: "#000" },
  { value: "Interpret", label: "Interpret", color: "#000" },
  { value: "Exemplify", label: "Exemplify", color: "#000" },
  { value: "Classify", label: "Classify", color: "#000" },
  { value: "Summarise", label: "Summarise", color: "#000" },
  { value: "Infer", label: "Infer", color: "#000" },
  { value: "Compare", label: "Compare", color: "#000" },
  { value: "Explain", label: "Explain", color: "#000" },
  { value: "Apply", label: "Apply", color: "#000" },
  { value: "Execute", label: "Execute", color: "#000" },
  { value: "Implement", label: "Implement", color: "#000" },
  { value: "Analyze", label: "Analyze", color: "#000" },
  { value: "Differentiate", label: "Differentiate", color: "#000" },
  { value: "Organize", label: "Organize", color: "#000" },
  { value: "Attribute", label: "Attribute", color: "#000" },
  { value: "Evaluate", label: "Evaluate", color: "#000" },
  { value: "Check", label: "Check", color: "#000" },
  { value: "Critique", label: "Critique", color: "#000" },
  { value: "Create", label: "Create", color: "#000" },
  { value: "Generate", label: "Generate", color: "#000" },
  { value: "Plan", label: "Plan", color: "#000" },
  { value: "Produce", label: "Produce", color: "#000" },
];

const formats = [
  { value: "MCQ", label: "MCQ", color: "#000" },
  { value: "Short Answer", label: "Short Answer", color: "#000" },
  { value: "Long Answer", label: "Long Answer", color: "#000" },
  { value: "Statement Based", label: "Statement Based", color: "#000" },
  { value: "Fillups", label: "Fillups", color: "#000" },
  { value: "True/False", label: "True/False", color: "#000" },
];

const resources = [
  { value: "Internet", label: "Internet", color: "#000" },
  { value: "Chart Paper", label: "Chart Paper", color: "#000" },
  { value: "Computer", label: "Computer", color: "#000" },
];

interface MultiSelectProps {
  selectedOptions: any;
  setSelectedOptions: (e: any) => void;
}

export default function VerbMultiSelect({
  selectedOptions,
  setSelectedOptions,
}: MultiSelectProps) {
  return (
    <Select
      className="remove-input-txt-border mt-3 text-left text-sm font-medium"
      closeMenuOnSelect={false}
      placeholder="Select a verb"
      components={animatedComponents}
      defaultValue={[]}
      value={selectedOptions}
      isMulti
      options={verbs}
      onChange={(e: any) => {
        setSelectedOptions(e);
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary: "#000",
          primary25: "#f2f5f5",
          primary50: "#f2f5f5",
        },
      })}
    />
  );
}

export function FormatMultiSelect({
  selectedOptions,
  setSelectedOptions,
}: MultiSelectProps) {
  return (
    <Select
      className="remove-input-txt-border mt-3 text-left text-sm font-medium"
      closeMenuOnSelect={false}
      placeholder="Select a question format"
      components={animatedComponents}
      defaultValue={[]}
      value={selectedOptions}
      isMulti
      options={formats}
      onChange={(e: any) => {
        setSelectedOptions(e);
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary: "#000",
          primary25: "#f2f5f5",
          primary50: "#f2f5f5",
        },
      })}
    />
  );
}

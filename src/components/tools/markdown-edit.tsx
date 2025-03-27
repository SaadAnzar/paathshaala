"use client";

import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

const MarkdownEdit = ({ value, onChange }: any) => {
  return (
    <SimpleMDE
      value={value}
      onChange={onChange}
      options={{
        toolbar: [
          "bold",
          "italic",
          "heading",
          "|",
          "quote",
          "unordered-list",
          "ordered-list",
          "table",
          "clean-block",
          "|",
          "horizontal-rule",
          "strikethrough",
          "preview",
        ],
        spellChecker: false,
        status: false,
        autofocus: true,
      }}
    />
  );
};

export default MarkdownEdit;

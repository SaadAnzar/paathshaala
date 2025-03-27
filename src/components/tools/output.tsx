"use client";

import { useRef } from "react";

import MarkdownComponent from "@/components/tools/markdown-component";

interface OutputProps {
  output: string;
  title: string;
  complete: boolean;
}

export default function Output({ output, title, complete }: OutputProps) {
  const componentRef = useRef(null);

  if (!output) return null;

  return (
    <div>
      <div
        className="mt-5 flow-root rounded-lg border-2 border-dashed border-gray-900 px-5 py-6 text-left"
        ref={componentRef}
      >
        <MarkdownComponent content={output} />
      </div>
    </div>
  );
}

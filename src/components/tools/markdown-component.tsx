"use client";

import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type MCtype = {
  content: string;
};

const MarkdownComponent = ({ content }: MCtype) => {
  return (
    <Markdown
      remarkPlugins={[[remarkGfm], [remarkMath]]}
      rehypePlugins={[rehypeKatex]}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownComponent;

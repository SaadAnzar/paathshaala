// import { openai } from "@ai-sdk/openai";
// import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  // const result = await streamText({
  //   model: openai("gpt-3.5-turbo"),
  //   prompt,
  // });

  // return result.toTextStreamResponse();
  return new Response("Hello World");
}

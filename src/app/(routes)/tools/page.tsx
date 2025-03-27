import Link from "next/link";
import { Rocket } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const tools = [
  {
    title: "Lesson Plan Generator",
    description:
      "Generates lesson plans, assignment and slide content for teachers based on input criteria and curriculum standards.",
    link: "/tools/lesson-plan-generator",
  },
  {
    title: "Worksheet Generator",
    description:
      "Generates questions for teachers to use in assessments and quizzes.",
    link: "/tools/worksheet-generator",
  },
  {
    title: "Activity Generator",
    description:
      "Generates engaging and interactive activities for teachers to use in their classrooms.",
    link: "/tools/activity-generator",
  },
  {
    title: "Concept Simplifier",
    description:
      "Simplifies complex concepts and presents them in a more understandable manner for students.",
    link: "/tools/concept-simplifier",
  },
  {
    title: "Feedback Generator",
    description:
      "Provides personalised feedback to students on their performance and assessments.",
    link: "/tools/feedback-generator",
  },
];

export default function ToolsDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {tools.map((tool, index) => (
        <Card
          key={index}
          className="bg-primary/10 ring-primary/20 relative rounded-xl shadow-lg ring-2"
        >
          <CardHeader className="mb-2 flex flex-row items-center gap-3 space-y-0 pb-0 opacity-100">
            <CardTitle className="flex w-full flex-row items-center justify-between gap-2 text-2xl font-bold tracking-tight">
              {tool.title}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="bg-secondary border-primary/20 rounded-xl border-2 px-2 py-0.5 text-xs">
                    5 credits
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>It takes 5 credits to use this tool.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="tracking-tighter">
            {tool.description}
          </CardContent>
          <CardFooter>
            <Link className={buttonVariants()} href={tool.link}>
              Launch Now <Rocket className="ml-2 size-4" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

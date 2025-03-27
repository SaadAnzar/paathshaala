import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { streamText } from "ai";

const generatePrompt = (params: any) => {
  const {
    tool,
    grade,
    subject,
    selectedVerbs,
    topic,
    selectedFormats,
    format,
    level,
    number,
    nature,
    skill,
    value,
    resources,
    focusAspect,
    concept,
    explain,
    strength,
    growth,
    studentName,
  } = params;
  let prompt: string = "";

  if (tool === "lesson-plan-generator") {
    prompt = `You are a teacher in an Indian school in a grade ${grade} class, teaching ${subject}. Your lesson objective for students is to ${selectedVerbs
      ?.map((verb: any) => verb.value)
      .join(",")} ${topic}. You are making a lesson plan for this class.
    Use only the following format:
    Lesson Objective:
    Opening
    Introduction to New Material
    Potential misunderstandings
    Guided Practice
    Independent Practice
    Closing
    Include all the following points in each corresponding section of the lesson plan:
    Under Lesson Objective Introduce the objective to the students and why they are learning it?
    Under Opening- Include a grade appropriate interesting hook for students’ attention. Also add what is the relevance of this lesson in the lives of students studying in schools in India. Do not give an explanation. Only give the relevance through examples or anecdotes that might make the lesson interesting for students.
    Under Introduction of New Material- Introduce the key information of this lesson in a way students can actively take this information in. Give recommendations of how, what and why should be taught in this class for best understanding. You are teaching in an Indian classroom, have options of examples that can be used while explaining the above mentioned objective. Include examples for each key point. - Within this section Include what are some potential misunderstandings students might have. Give examples that you would use to mitigate these misunderstandings. Also include a list of 5 ways in which you will engage students in this lesson.
      Under Guided Practice- List 5 ways in which you can help students practice the lesson objective. Give 2 options which need no resources, and give other options that need minimum resources. Give scaffolded practice exercises from easy to hard. Include a mix of group activities, individual activities, practical activities that do not need a lot of additional resources and can be done without computers or mobiles.
      Under Independent Practice- Make a list of 10 scaffolded questions that will help you evaluate student understanding. Make sure these questions are across different rigor levels.  Include a mix of MCQs, and normal Q&As
      Under Closing- Give me 3 options to make students summarize and recap what they learned in this class. Make sure you help students make connections between what they learnt in the lesson and in their life. Remember these students belong to schools in Indian urban cities.
      Give a suitable time for each section such that the class can be done in 45 minutes.
      Give the output only in the following format:
    Lesson Objective:
    Opening
    Introduction to New Material
    Potential misunderstandings
    Guided Practice
    Independent Practice
    Closing
    Keep the above points in the same order. Each section should be as detailed as possible with great amount and quality of content, including examples, bullet points wherever possible. add at least 5 points for each section.
    `;
  } else if (tool === "worksheet-generator") {
    prompt = `You are a teacher in an Indian school in a grade ${grade} class, teaching ${subject}. Your lesson objective for students is to ${selectedVerbs
      ?.map((verb: any) => verb.value)
      .join(
        ","
      )} ${topic}. You are making scaffolded practice questions for this class.
    As an AI, generate diverse, thought-provoking questions based on the above data in format of ${selectedFormats
      ?.map((format: any) => format.value)
      .join(
        ","
      )}. The questions should be of ${level} difficulty, with the complexity of the answer reflecting its difficulty. Aim to stimulate diverse answers and deepen subject comprehension.
    Provide an answer key for each question, highlighting main concepts required for a complete response. Be creative and aim to spark dynamic responses and deepen understanding of the topics.
    Generate ${number} questions.
    Keep the format strictly like this:
    Initially all the questions should be generated strictly in the format like:
    Question 1:
    Question 2:
    etc

    After all the questions are generated, generate the answer key each question at the end strictly in the format like this:
    Answer Key:

    After the answer key, generate the key concepts required for each answer above strictly in the format like this:
    Key Concepts:

    Follow the above format strictly at all costs for any type of question format.
    `;
  } else if (tool === "activity-generator") {
    prompt = `You are a teacher. You teach ${subject} subject to a grade ${grade} classroom in a school located in India. Your lesson topic for students is to ${selectedVerbs
      ?.map((verb: any) => verb.value)
      .join(",")} ${topic}.
    For the above topic, please plan ${number} ${nature} activities for the students in your class. Ensure that the activities give students an opportunity to make use of ${skill} skills and are rooted in the values of ${value}. The classroom has the following resources- ${resources}, make sure the activities are designed using these resources and do not recommend any other resources.
      Keep the format strictly like this:
      Activity Title:
      One line description of the activity:
      Resources:
      Instructions for students:
    `;
  } else if (tool === "concept-simplifier") {
    prompt = `You are a teacher in India who wants to simplify a tough concept in a way that is easy for students to understand. Please simplify ${explain} which is a concept under ${concept} using ${format} appropriate for learners in class ${grade}. Give 5 ways in which this topic/concept can be simplified for this audience. Limit each method to 5 lines.
  Optional- Make sure the simplified explanations focus on simplifying ${focusAspect}
  `;
  } else if (tool === "feedback-generator") {
    prompt = `You are a teacher. You are writing constructive feedback for your student with 3 clear next steps for the student to follow. The name of the students is ${studentName} and is a student of grade [grade] classroom in a school located in India. ${studentName} has ${strength} as his Areas of Strengths and ${growth} as things he needs to improve on.
  Write constructive feedback for ${studentName} and outlining 3 clear next steps for them to follow. Keep the feedback under 5 lines.
  Keep the format strictly as follows:
  Feedback-
  Next steps-
  `;
  }

  return prompt;
};

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();

  console.log("body", body);

  if (!body.tool) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  const prompt = generatePrompt({ ...body });

  console.log("prompt", prompt);

  if (!prompt) {
    return NextResponse.json({ error: "Invalid Prompt" }, { status: 400 });
  }

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    prompt,
  });

  return result.toTextStreamResponse();
}

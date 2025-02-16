// import { openai } from "@ai-sdk/openai";
// import { streamText } from "ai";

// export const generateActivity = async (prompt: string) => {
//   const prompt: string = `You are a teacher. You teach ${subject} subject to a grade ${grade} classroom in a school located in India. Your lesson topic for students is to ${selectedVerbs
//     .map((verb: any) => verb.value)
//     .join(",")} ${topic}.
//     For the above topic, please plan ${number} ${nature} activities for the students in your class. Ensure that the activities give students an opportunity to make use of ${skill} skills and are rooted in the values of ${values}. The classroom has the following resources- ${resources}, make sure the activities are designed using these resources and do not recommend any other resources.
//       Keep the format strictly like this:
//       Activity Title:
//       One line description of the activity:
//       Resources:
//       Instructions for students:
//     `;
//   const result = await streamText({
//     model: openai("gpt-3.5-turbo"),
//     prompt,
//   });

//   return result.toTextStreamResponse();
// };

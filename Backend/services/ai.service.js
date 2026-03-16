const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function invokeGeminiAi() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "hello gemini! i want to know what is interview?",
  });

  console.log(response.text);
}

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score out of 100 that indicates how well the candidate is prepared for the interview based on resume, job description and self description",
    ),
  technicalQuestion: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Technical question to be asked in interview"),
        intention: z.string().describe("Intention behind asking the question"),
        answer: z
          .string()
          .describe(
            "how to answer this question, what points to be covered in answer and what the interviewer is looking for in answer",
          ),
      }),
    )
    .describe(
      "Technical question that can be asked in interview based along with intention and how to answer it",
    ),
  behavioralQuestion: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Behavioral question to be asked in interview"),
        intention: z.string().describe("Intention behind asking the question"),
        answer: z
          .string()
          .describe(
            "how to answer this question, what points to be covered in answer and what the interviewer is looking for in answer",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in interview based along with intention and how to answer it",
    ),
  skillGap: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "Skill that candidate is lacking based on resume, job description and self description",
          ),
        severity: z
          .enum(["Low", "Medium", "High"])
          .describe(
            "Severity of the skill gap, how important it is for candidate to work on this skill gap before interview",
          ),
      }),
    )
    .describe(
      "Skill gaps that candidate need to work on before interview along with severity",
    ),
  preprationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe(
            "Day number in prepration plan, for how many days candidate need to prepare before interview",
          ),
        focus: z
          .string()
          .describe(
            "Focus of the day, what candidate should focus on that day in prepration plan",
          ),
        task: z
          .array(z.string())
          .describe(
            "Task that candidate need to do on that day in prepration plan",
          ),
      }),
    )
    .describe(
      "Prepration plan for candidate to prepare for interview, it will be a day wise plan with focus and task for each day",
    ),
});

async function generateInterviewReport({
  resume,
  jobDescription,
  selfDescription,
}) {
  const prompt = `Generate an interview report based on the following details:
    Resume: ${resume}
    Job Description: ${jobDescription}
    Self Description: ${selfDescription}
    `;
  const response = await ai.models.generateContent({
    // generate interview report based on resume, job description and self description
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      // it tells the model to generate response in a specific format based on zod schema, it will generate response in json format and it will follow the structure of interviewReportSchema
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  console.log(JSON.parse(response.text));
}

module.exports = { invokeGeminiAi, generateInterviewReport };

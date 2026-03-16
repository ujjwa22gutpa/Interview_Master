const {GoogleGenAI} = require("@google/genai")
const {zod} = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const {resume, jobDescription, selfDescription} = require("./temp");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

 async function invokeGeminiAi() {
     const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"hello gemini! i want to know what is interview?"
     })

     console.log(response.text)
}


const interviewReportSchema = zod.object({
    matchScore:zod.number().description("A score out of 100 that indicates how well the candidate is prepared for the interview based on resume, job description and self description"),
    technicalQuestion: zod.array(zod.object({
        question:z.string().description("Technical question to be asked in interview"),
        intention:z.string().description("Intention behind asking the question"),
        answer:z.string().description("how to answer this question, what points to be covered in answer and what the interviewer is looking for in answer")
    })).description("Technical question that can be asked in interview based along with intention and how to answer it"),
    behavioralQuestion:zod.array(zod.object({
        question:z.string().description("Behavioral question to be asked in interview"),
        intention:z.string().description("Intention behind asking the question"),
        answer:z.string().description("how to answer this question, what points to be covered in answer and what the interviewer is looking for in answer")
    })).description("Behavioral questions that can be asked in interview based along with intention and how to answer it"),
    skillGap: zod.array(zod.object({
        skill:z.string().description("Skill that candidate is lacking based on resume, job description and self description"),
        severity:z.enum(["Low", "Medium", "High"]).description("Severity of the skill gap, how important it is for candidate to work on this skill gap before interview")

        })).description("Skill gaps that candidate need to work on before interview along with severity"),
    preprationPlan: zod.array(zod.object({
    day:z.number().description("Day number in prepration plan, for how many days candidate need to prepare before interview"),
    focus:z.string().description("Focus of the day, what candidate should focus on that day in prepration plan"),
     task:z.array(z.string()).description("Task that candidate need to do on that day in prepration plan")
    })).description("Prepration plan for candidate to prepare for interview, it will be a day wise plan with focus and task for each day")
})


async function generateInterviewReport({resume, jobDescription, selfDescription}){
     const response = await ai.models.generateContent({ // generate interview report based on resume, job description and self description
        model:"gemini-2.5-flash",
        contents:"",
        congfig: { // it tells the model to generate response in a specific format based on zod schema, it will generate response in json format and it will follow the structure of interviewReportSchema
            responseMimeType:"application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
     })
}

module.exports = invokeGeminiAi;

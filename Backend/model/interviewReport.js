const { required } = require("joi");
const mongoose = require("mongoose");

const technicalQuestionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Techincal Questions are required "],
    },
    intention: {
      type: String,
      required: [true, "Intention are required"],
    },
    answer: {
      type: String,
      required: [true, "Answers are required"],
    },
  },
  {
    id: false,
  },
);

const behaviouralQuestionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Techincal Questions are required "],
    },
    intention: {
      type: String,
      required: [true, "Intention are required"],
    },
    answer: {
      type: String,
      required: [true, "Answers are required"],
    },
  },
  {
    id: false,
  },
);

const skillGapSchema = mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skills are required"],
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: [true, "Severity is required"],
    },
  },
  {
    id: false,
  },
);

const preprationPlanSchema = mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Days are required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  task: [
    {
      type: String,
      required: [true, "Task is required"],
    },
  ],
});

const interviewSchema = mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behaviouralQuestionSchema],
    skillGap: [skillGapSchema],
    preprationPlan: [preprationPlanSchema],
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = mongoose.model("interviewReport", interviewSchema);

module.exports = interviewReportModel;

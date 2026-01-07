import mongoose, { Schema } from 'mongoose'

// import { Auditor } from '../../models/Audit/Audit.js'
import { Auditor } from '../../models/Audit/Audit.js'

// Problem Types:

// Potential domains...?
// Arithmetic, Algebra, Geometry, Trigonometry, Statistics, Number Theory, Calculus, Word Problems, Finance

// Examples:
//    Multiple Choice or :mc:
//    Body.                 "What's Flutter primarily written in?"
//    Options.              [Python, Ruby, C, C++]
//    Answer.               Dart

//    Free Response or :fr:
//    Body.                 "What's 4 squared?"
//    Options.              null
//    Answer.               16

//    Checkbox or :cb:
//    Body.                 "Which are prime numbers?"
//    Options.              [1, 2, 3, 5, 7, 11, 13, 15]
//    Answer.               [2, 3, 5, 7, 11, 13]

//    Fill in the blank or :fb:
//    Body.                 "Calculus is the study of _____?"
//    Options.              [Math, Derivatives, Equations, Change]
//    Answer.               Change

//    Matching: :m:
//    Body.                 Match the term to it's definition.
//    Terms.                Asymptote, Derivative
//    Options/Definitions   ["a line that continually approaches a given curve but does not meet it at any finite distance.", "(of a financial product) having a value deriving from an underlying variable asset."]
//    Answer.               [[Asymptote, "a line that continually approaches a given curve but does not meet it at any finite distance."], [Derivative,"(of a financial product) having a value deriving from an underlying variable asset."]]

//    Short Answer or :sa:
//    Body.                 "If you invest $1000 at an annual interest rate of 5% for 2 years, how much will you have at the end? How about after 10 years?"
//    Answer.               "After 2 years, $1102.5, then $1628.89 for 10"

//    True/False or :tf:
//    Body.                 "Is Studying math is good for you?"
//    Answer.               true

// https://tutorial.math.lamar.edu/Problems/CalcI/TheLimit.aspx
// frs with selected

const problemSchema = new Schema({
  // - Data Structures & Algorithms, Multiple Choice, Free Response, Checkbox, Fill in the blank, Matching, Short Answer, True/False
  // - Acronyms: dsa, mc, fr, frs, cb, fb, m, sa, tf
  type: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  isPublished: {
    type: Boolean,
    required: true,
  },
  isSubmitted: {
    type: Boolean,
    required: true,
  },
  numLC: {
    type: Number,
    required: true,
  },
  voterIds: {
    type: Map,
    of: String,
  },
  editorialAuthor: { type: Schema.Types.ObjectId, ref: 'User' },
  editorialBody: {
    type: String,
  },
  editorialRating: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  editorialVotes: {
    type: Map,
    required: true,
  },
  accepted: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  submissions: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  acceptanceRate: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  testCases: {
    type: [
      {
        output: Schema.Types.Mixed,
        explanation: String,
        inputs: {
          type: Schema.Types.Mixed,
          required: true,
        },
      },
    ],
    required: true,
  },
  topics: [{ name: String }],
  hints: {
    type: [String],
    default: [],
    required: true,
  },
  constraints: {
    type: [String],
    default: [],
    required: true,
  },
  startCode: {
    type: String,
  },
  similar: [
    {
      difficulty: { type: String },
      id: { type: Number },
      title: { type: String },
    },
  ],
  signature: {
    parameters: [
      {
        type: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    returnType: { type: String, required: true },
  },
  // Math problem attributes
  hint: {
    type: String,
  },
  prompt: {
    type: String,
  },
  equation: {
    type: String,
  },
  evaluate: {
    type: String,
  },
  solution: {
    type: String,
  },
  answer: {
    type: String,
  },
  answerLatex: {
    type: String,
  },
  imgUrls: {
    type: String,
  },
  answerPlaceholder: {
    type: String,
  },
  formulas: {
    type: String,
  },
  terms: {
    type: [String],
  },
  options: {
    type: [String],
  },
  followUpPrompt: {
    type: String,
  },
  followUpAnswer: {
    type: String,
  },
  followUpExplanation: {
    type: String,
  },
})

const Problem = mongoose.model('Problem', problemSchema)

export default Problem
export { problemSchema, Problem }

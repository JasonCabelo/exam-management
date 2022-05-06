const mongoose = require("mongoose");

const choicesSchema = mongoose.Schema(
    {
      text: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
const QuestionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    }, 
    question: {
        type: String,
        required: true,
    }, 
    image: {
        type: String,
      required: true,  
    },
    choices: [choicesSchema],
    answers: {
        type: String,
    required: true,    
    }, 
    point: {
        type: Number,
        required: true,
    },
    knowledgeDimension: {
        type: String,
        required: true,
    },
    cpDimension: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Question = mongoose.model("questions", QuestionSchema);
module.exports = Question;
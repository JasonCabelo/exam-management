const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({

    code: {
        type: String,
      required: true  
    },
    title: {
        type: String,
        required: true,
    }, 
    instructions: {
        type: String,
        required: true,
    }, 
    timeLimit: {
        type: String,
        required: true,
    },
    activeFrom: {
        type: Date,
        default: Date.now,    
    }, 
    activeTo: {
        type: Date,
       default: Date.now,
    }
})

const Exam = mongoose.model("exam", ExamSchema);
module.exports = Exam;
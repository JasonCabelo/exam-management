const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({

    fName: {
        type: String,
        required: [true, "Please Provide a First Name"],
    },
    lName: {
        type: String,
        required: [true, "Please Provide a Last Name"],
    },
    knowledgeDimension: {
        type: Array,
        required: true,
    },
    cpDimension: {
        type: Array,
        required: true,
    },
    score: {
        type: Array,
        required: true,
    }
})
const Result = mongoose.model("results", ResultSchema);
module.exports = Result;
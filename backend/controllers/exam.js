const Exam = require('../models/Exam');
const Question = require('../models/Question');
const Result = require('../models/Results');
const ErrorResponse = require('../utils/errorResponse');
const multer = require('multer');
const path = require('path');

exports.createExam = async (req, res, next) => {
    const { title, instructions, timeLimit, activeFrom, activeTo } = req.body;
    try {
        const create = await Exam.create({ title, instructions, timeLimit, activeFrom, activeTo });
        return res.status(200).json({
            message: create,
            message: 'Exam Details created successfully'
        });
    } catch (error) {
      
        console.log(error);
        return res.status(400).json({
            message: error
        });
    }
}
exports.readExam = async (req, res, next) => {
    try {
        const exam = await Exam.find({})
        return res.status(200).json(exam);
    } catch (error) {
        return res.status(400).json(error);
    }
}
exports.readExamById = async (req, res, next) => {
    const examId = req.params.examId;
    try {
        const exams = await Result.findById(examId,{});
        return res.status(200).json(exams);
    } catch (error) {
        return res.status(400).json(error);
    }
}
exports.updateExam = async (req, res, next) => {
    const examId = req.params.examId;
    const {title, instructions, timeLimit, activeFrom, activeTo} = req.body;
    console.log(examId);
    try {
        const examUpdate = await Exam.findOneAndUpdate(
            { _id: examId },
            { ...req.body },
            res.status(200).json({ message: 'Exam details updated' })
        )
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
    }

}
exports.deleteExam = async (req, res, next) => {
    const examId = req.params.examId;
    console.log(examId);
    try {
        const examData = await Exam.findByIdAndDelete(examId, function (err) {
            if   (err) {
                return res.status(400).json({ message: "failed to delete document" });
            } else {
                return res.status(200).json({
                    message: "successfully deleted",
                });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error in Deleting");
    }
}

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.filename+ '-'+ Date.now() + path.extname(file.originalname));
      }
})
var upload = multer({storage: Storage }).single('image');
exports.createQuestions = upload,async (req, res, next) => {

    console.log(req.file);

    const { title, question,image, choices, answers, point, knowledgeDimension, cpDimension } = req.body;
    try {
        createQ = new Question({ title, question,image,choices, answers,point, knowledgeDimension, cpDimension });
        let data = await createQ.save();
        const payload={
            data,
        }
        res.status(200).json({
            payload,
          });
    } catch (error) {
        console.log(error);
        res.status(400).send({error});
    }
}
exports.readQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find({});
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(400).json(error);
    }
}
exports.readQuestionsById = async (req, res, next) => {
    const questionId = req.params.questionId;
    try {
        const questions = await Question.findById(questionId,{});
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(400).json(error);
    }
}
exports.updateQuestions = async (req, res, next) => {
    const questionId = req.params.questionId;
    console.log(questionId);
    const { title, question, choices, answers, point, knowledgeDimension, cpDimension } = req.body;
    try {
        const questionUpdate = await Question.findOneAndUpdate(
            { _id: questionId },
            { ...req.body },
            res.status(200).json("Question Updated")
        )
        console.log(questionUpdate);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });

    }
   
}
exports.deleteQuestions = async (req, res, next) => {
    const questionId = req.params.questionId;
    console.log(questionId);
    try {
        const questionData = await Question.findByIdAndDelete(questionId,
        res.status(200).send({ message:"Question Deleted Successfully"}));
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error in Deleting");
    }
}
exports.generateResults = async (req, res, next) => {
    const { fName, lName, knowledgeDimension, cpDimension, score } = req.body;
    try {
        genResults = new Result({ fName, lName, knowledgeDimension, cpDimension, score});
        let data = await genResults.save();
        const payload={
            data,
        }
        res.status(200).json({
            payload,
          });
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}
exports.readResults = async (req, res, next) => {
    try {
        const results = await Result.find({});
        return res.status(200).json(results);
    } catch (error) {
        return res.status(400).json(error);
    }
}
exports.readResultsById = async (req, res, next) => {
    const resultId = req.params.resultId;
    try {
        const results = await Result.findById(resultId,{});
        return res.status(200).json(results);
    } catch (error) {
        return res.status(400).json(error);
    }
}
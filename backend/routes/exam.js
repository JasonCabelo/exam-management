const express = require("express");

const router = express.Router();

const {
    createExam,
    updateExam,
    deleteExam,
    createQuestions,
    updateQuestions,
    deleteQuestions,
    generateResults,
    readExam,
    readExamById,
    readQuestions,
    readQuestionsById,
    readResults,
    readResultsById

} = require("../controllers/exam");
router.route('/createExam').post(createExam);
router.route('/exam-read').get(readExam);
router.route('/examId-read/:examId').get(readExamById);
router.route('/updateExam/:examId').put(updateExam);
router.route('/deleteExam/:examId').delete(deleteExam);
router.route('/createQuestions').post(createQuestions);
router.route('/updateQuestions/:questionId').put(updateQuestions);
router.route('/deleteQuestions/:questionId').delete(deleteQuestions);
router.route('/questionsId/:questionId').get(readQuestionsById);
router.route('/questions/').get(readQuestions);
router.route('/results').post(generateResults);
router.route('/result-details').get(readResults);
router.route('/result-details-id/:resultId').get(readResultsById);
module.exports =router;

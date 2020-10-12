var express = require("express");
var router = express.Router();
const jsontoken = require('jsonwebtoken');
const survey_model = require('../model/survey_model');


// get request see survey question
router.get("/take/:id", authenticatetoken, function (req, res, next) {

    survey_model.take_survey(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            console.log(rows);
            console.log(rows.length);
            if(rows.length !== 0)
            {
                res.json({
                    rows,
                    message: "Survey questions "
                });
            }
            else{
                res.json({
                    message: "Survey Doesnot exixts Or Survey does not have question"
                });
            }
            
        }
    });
});


// post request to create survey
router.post("/generate", authenticatetoken, function (req, res, next) {

    survey_model.generate_survey(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                message: "Survey Created",
                id: "ID " + rows.insertId + "to be used  to add questions to survey"
            });
        }
    });
});

// post request to add question to a survey
router.post("/questionAdd", authenticatetoken, function (req, res, next) {

    survey_model.question_add(req.body, function (err, rows) {
        if (err) {
            res.json("Question already Exists or Please try to enter key value pair in body of request id,question,choice1,choice2 format or Survey  doesnot exists");
        } else {
            res.json({
                message: "Question Added in the survey"
            });
        }
    });
});

// post request to answer the survey question
router.post("/submitSurvey", authenticatetoken, function (req, res, next) {

    survey_model.submit_survey(req.body, function (err, rows) {
        if (err) {
            res.json("Question Doesnot Exists or Please try to enter key value pair in body of request id,question,choice1,choice2,name,answer format or Survey  doesnot exists");
        } else {
            res.json({
                message: "Answer Submitted"
            });
        }
    });
});


// get request to view the result of the survey
router.get("/surveyResult/:id", authenticatetoken, function (req, res, next) {

    survey_model.survey_result(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            if (rows.length !== 0) {
                res.json(rows);
            }
            else {
                res.json({
                    message : "No Question added in survey OR No question answered"
                })
            }


        }
    });
});


function authenticatetoken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //bearer <space> token so split 
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jsontoken.verify(bearerToken, "secretkey", (err, authData) => {
            if (err) {
                console.log(err);
                res.json("JWT Invalid");
            }
            else {
                next();
            }
        });

    } else {
        //reject
        res.json("Please Authenticate before using service");
    }

}

module.exports = router;
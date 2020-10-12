var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');


router.post("/", function (req, res, next) {

    if (req.body.username && req.body.password) {

        const user = {
            username: req.body.username,
            password: req.body.password
        };

        jwt.sign(user, "secretkey", (err, token) => {
            res.json({ token });
        });

    }
    else {
        res.json("Invalid");
    }

});



module.exports = router;

const { User } = require("../databases");

function userMiddleware(req, res, next) {
    // Implementing user auth logic
    //checking the headers and validating the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username; // fizz@gmail.com
    const password = req.headers.password; /// 123456

    User.findOne({
        username: username,
        password: password
    })
    .then(function(value) {
        if (value) {
            next();
        } else {
            res.status(403).json({
                msg: "User doesnt exist"
            })
        }
    })
}

module.exports = userMiddleware;
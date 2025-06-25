const { Admin } = require("../databases");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implementing admin authentication logic
    // checking the headers and validating the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username; // fizz@gmail.com
    const password = req.headers.password; //  123456

    Admin.findOne({
        username: username,
        password: password
    })
    .then(function(value) {
        if (value) {
            next();
        } else {
            res.status(403).json({
                msg: "Admin doesnt exist"
            })
        }
    })
}

module.exports = adminMiddleware;
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../databases");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    // Implementing user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username, 
        password
    })
    res.json({
        message: "User created successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implementing listing all courses logic
     // Implementing fetching all courses logic
     const response = await Course.find({});

     res.json({
         courses: response
     })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implementing course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implementing fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router
const express = require("express");
const adminMiddleware = require("../middlewares/admin");
const { Admin, Course } = require("../databases");
const router = express.Router();

router.post('/signup', async (req, res) => {
    // Implementing admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // checking if a user with this username already exists
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: 'Admin created successfully'
    })
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implementing course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implementing fetching all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })

});


module.exports = router;
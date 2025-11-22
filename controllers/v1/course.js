// Courses Model
const mongoose = require("mongoose");
const courseModel = require("./../../models/course");
// Session Model
const sessionModel = require("./../../models/session");
// Course User Model
const courseUserModel = require("./../../models/course-user");
//  commentModel
const commentModel = require("./../../models/comment");
// Category Model
const categoryModel = require("./../../models/category");

// create Course
exports.create = async (req, res) => {
    // Req.body
    const {
        name,
        description,
        cover,
        support,
        href,
        price,
        status,
        discount,
        categoryID
    } = req.body;
    // Create Course
    const course = await courseModel.create({
        name,
        description,
        creator: req.user._id,
        categoryID,
        support,
        price,
        href,
        status,
        discount,
        cover: req.file.filename,
    });

    const mainCourse = await courseModel
        .findById(course._id)
        .populate("creator", "-password");

    return res.status(201).json(mainCourse);
}

// GetAll Course 
// Way One
exports.getAll = async (req, res) => {
    const courses = await courseModel
        .find({})
        .populate("categoryID")
        .populate("creator")
        .lean().sort({ _id: -1 });

    const registers = await courseUserModel.find({}).lean();
    const comments = await commentModel.find({}).lean();

    const allCourses = [];

    courses.forEach(course => {
        let totalScore = 0;
        const courseRegisters = registers.filter(register => register.course.toString() == course._id.toString());
        const courseComments = comments.filter(comment => {
            return comment.course.toString() == course._id.toString()
        });

        courseComments.forEach(comment => {
            totalScore += Number(comment.score)
        })

        allCourses.push({
            ...course,
            categoryID: course.categoryID.title,
            creator: course.creator.name,
            registers: courseRegisters.length,
            courseAvrageScore: Math.floor(totalScore / courseComments.length)
        })
    });


    return res.status(200).json(allCourses);
}

// Way Two
// exports.getAll = async (req, res) => {
//     const courses = await courseModel.aggregate([
//         {
//             $lookup: {
//                 from: "courseusers",
//                 localField: "_id",
//                 foreignField: "course",
//                 as: "registers"
//             }
//         },
//         {
//             $lookup: {
//                 from: "comments",
//                 localField: "_id",
//                 foreignField: "course",
//                 as: "comments"
//             }
//         },
//         {
//             $lookup: {
//                 from: "categories",
//                 localField: "categoryID",
//                 foreignField: "_id",
//                 as: "category"
//             }
//         },
//         { $unwind: "$category" },
//         {
//             $lookup: {
//                 from: "users",
//                 localField: "creator",
//                 foreignField: "_id",
//                 as: "creator"
//             }
//         },
//         { $unwind: "$creator" },
//         {
//             $addFields: {
//                 registers: { $size: "$registers" },
//                 courseAvgScore: { $round: [{ $avg: "$comments.score" }, 0] },
//                 categoryTitle: "$category.title",
//                 creatorName: "$creator.name"
//             }
//         },
//         {
//             $project: {
//                 comments: 0,
//                 category: 0,
//                 creator: 0
//             }
//         },
//         { $sort: { _id: -1 } }
//     ]);

//     return res.status(200).json(courses);
// };


// Craete Sessions
exports.createSession = async (req, res) => {
    // Data
    const { title, time, free } = req.body;
    const { id } = req.params;
    // Craete Session
    const session = sessionModel.create({
        title,
        time,
        free,
        video: "Video.mp4", // req.file.filename
        course: id,
    });
    // Response
    return res.status(201).json(session);
};

// Get All Sessions
exports.getAllSessions = async (req, res) => {
    const sessions = await sessionModel.find({}).populate("course", "name").lean();
    res.status(200).json(sessions);
}

// Get Session Info
exports.getSessionInfo = async (req, res) => {
    const course = await courseModel.findOne({ href: req.params.href });
    const session = await sessionModel.findOne({ _id: req.params.sessionID });
    const sessions = await sessionModel.find({ course: course._id })

    res.status(200).json({ session, sessions })
}

// Remove Session
exports.removeSession = async (req, res) => {
    const sessionID = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(sessionID);

    if (!isValidId) {
        return res.status(409).json({
            message: "Session ID is Not Valid !!"
        })
    }

    const deletedCourse = await sessionModel.findByIdAndDelete({ _id: req.params.id });

    if (!deletedCourse) {
        return res.status(404).json({
            message: "Course Not Found !"
        })
    }

    return res.json(deletedCourse)
}

// Course Register
exports.register = async (req, res) => {
    const isUserAlreadyRegisterd = await courseUserModel.findOne({
        user: req.user._id,
        course: req.params.id
    }).lean();

    if (isUserAlreadyRegisterd) {
        return res.status(409).json({
            message: "User Already Registerd in This Course."
        })
    }

    const register = await courseUserModel.create({
        user: req.user._id,
        course: req.params.id,
        price: req.body.price
    });
    return res
        .status(201)
        .json({
            message: "You Are Registerd Successfully in This Course"
        });
}

// Get Courses By Category
exports.getCoursesByCategory = async (req, res) => {
    const { href } = req.params;
    const category = await categoryModel.findOne({ href });

    if (!category) {
        return res.status(409).json("Category Not Found");
    }

    const coursesCategory = await courseModel.find({ categoryID: category._id });
    return res.status(200).json(coursesCategory)
}

// Get One Course
exports.getOne = async (req, res) => {
    const { href } = req.params;
    const course = await courseModel
        .findOne({ href }, "-__v")
        .populate("creator", "-password")
        .populate("categoryID");

    const sessions = await sessionModel.find({ course: course._id }).lean();
    const comments = await commentModel
        .find({ course: course._id, isAccept: 1 })
        .populate("creator", "-password")
        .populate("course")
        .lean();

    const courseStudentCount = await courseUserModel
        .countDocuments({ course: course._id })

    if (!course) {
        return res.status(409).json({
            message: "This Course Is Not Found !!",
        });
    }

    const isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({
        user: req.user._id,
        course: course._id
    }))

    let allComments = comments
        .filter(c => !c.mainCommentID)
        .map(comment => ({
            ...comment,
            course: comment.course.name,
            creator: comment.creator.name,
            answer: comments
                .filter(a => String(a.mainCommentID) == String(comment._id))
                .map(answer => ({
                    ...answer,
                    course: answer.course.name,
                    creator: answer.creator.name,
                }))
        }))

    return res.status(200).json({
        course,
        sessions,
        comments: allComments,
        courseStudentCount,
        isUserRegisteredToThisCourse
    })
}

// Remove Course
exports.remove = async (req, res) => {
    const courseID = req.params.id;
    const isObjectIdValid = mongoose.Types.ObjectId.isValid(courseID);

    if (!isObjectIdValid) {
        return res.status(409).json({
            message: "Your Course ID Is Not Valid!!"
        })
    }

    const deletedCourse = await courseModel.findByIdAndDelete({ _id: courseID });

    if (!deletedCourse) {
        return res.status(404).json({
            message: "Course Not Found!!"
        })
    }

    return res.status(200).json(deletedCourse);
}

// Get Related Course
exports.getRelated = async (req, res) => {
    const { href } = req.params;

    const course = await courseModel.findOne({ href });
    if (!course) {
        return res.status(404).json({
            message: "Course Not Found !!"
        })
    };


    let relatedCourses = await courseModel.find({ categoryID: course.categoryID });

    relatedCourses = relatedCourses.filter((course) => course.href !== href);

    return res.status(200).json(relatedCourses);
}

// get Popular Courses
exports.popular = async (req, res) => {
    try {
        const courseScores = await commentModel.aggregate([
            { $match: { isAccept: 1, score: { $exists: true } } },
            {
                $group: {
                    _id: "$course",
                    avgScore: { $avg: "$score" },
                    totalComments: { $sum: 1 },
                }
            },
            { $sort: { avgScore: -1, totalComments: -1 } },
            { $limit: 10 }
        ]);


        const courseIds = courseScores.map(c => c._id);
        const courses = await courseModel.find({ _id: { $in: courseIds } })
            .select("name")
            .lean();


        const popularCourses = courseScores.map(c => {
            const course = courses.find(co => co._id.toString() === c._id.toString());
            return {
                ...course,
                avgScore: c.avgScore.toFixed(2),
                totalComments: c.totalComments
            };
        });

        res.status(200).json({
            success: true,
            count: popularCourses.length,
            popularCourses
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch popular courses"
        });
    }
};


// Presell Courses
exports.presell = async (req, res) => {
    const presellCourses = await courseModel.find({ status: "presell" })
    res.status(200).json(presellCourses);
}
// Comment Model
const { default: mongoose } = require("mongoose");
const commentsModel = require("./../../models/comment");
// Course Model
const courseModel = require("./../../models/course")

// Create Comments
exports.create = async (req, res) => {
    const { body, courseHref, score } = req.body;
    const course = await courseModel.findOne({ href: courseHref }).lean();
    const comment = await commentsModel.create({
        body,
        course: course._id,
        creator: req.user._id,
        score,
        isAccept: 0,
        isAnswer: 0,
    });
    return res.status(201).json(comment)
}

// Remove Comment
exports.remove = async (req, res) => {
    const commentID = req.params.id;
    const isValidID = mongoose.Types.ObjectId.isValid(commentID);
    if (!isValidID) {
        return res.status(409).json({
            message: "Your Comment ID Is Not Valid !!"
        })
    };

    const deletedComment = await commentsModel.findByIdAndDelete({ _id: commentID });
    if (!deletedComment) {
        return res.status(404).json({
            message: "Comment Is Not Found"
        })
    }

    return res.status(200).json(deletedComment);
}

// Accept Comment
exports.accept = async (req, res) => {
    const commentID = req.params.id;
    const isValidID = mongoose.Types.ObjectId.isValid(commentID);
    if (!isValidID) {
        return res.status(409).json({
            message: "Your Comment ID Is Not Valid !!"
        })
    };
    const acceptedComment = await commentsModel.findByIdAndUpdate(
        {
            _id: commentID
        },
        { isAccept: 1 }
    );

    if (!acceptedComment) {
        return res.status(404).json({
            message: "Comment Is Not Found"
        })
    }

    return res.status(200).json({
        message: "Comment Accepted Successfully"
    })
};

// Reject Comment
exports.reject = async (req, res) => {
    const commentID = req.params.id;
    const isValidID = mongoose.Types.ObjectId.isValid(commentID);
    if (!isValidID) {
        return res.status(409).json({
            message: "Your Comment ID Is Not Valid !!"
        })
    };
    const rejectedComment = await commentsModel.findByIdAndUpdate(
        {
            _id: commentID
        },
        { isAccept: 0 }
    );

    if (!rejectedComment) {
        return res.status(404).json({
            message: "Comment Is Not Found"
        })
    }

    return res.status(200).json({
        message: "Comment Rejected Successfully"
    })
}

// Answer Comments
exports.answer = async (req, res) => {
    const { body } = req.body;
    const commentID = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(commentID);
    if (!isValidId) {
        return res.status(409).json({
            message: "Comment ID Is Not Valid !"
        });
    }

    const acceptedComment = await commentsModel.findByIdAndUpdate({ _id: commentID }, { isAccept: 1 });

    if (!acceptedComment) {
        return res.status(404).json({
            message: "Comment Not Found !"
        })
    }

    const answerComment = await commentsModel.create({
        body,
        course: acceptedComment.course,
        creator: req.user._id,
        isAccept: 1,
        isAnswer: 1,
        mainCommentID: commentID,
    })

    return res.status(201).json(answerComment)
}

// Get All Comments
exports.getAll = async (req, res) => {
    const comments = await commentsModel
        .find()
        .populate("course")
        .populate("creator", "-password")
        .lean();

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
                    creator: answer.creator.name
                }))
        }))
    return res.status(200).json(allComments)
}
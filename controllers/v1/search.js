// Course Model
const courseModel = require("./../../models/course");

// get
exports.get = async (req, res) => {
    const { keyword } = req.params;
    const course = await courseModel.find({
        name: { $regex: ".*" + keyword + ".*" }
    });
    return res.status(200).json(course);
}
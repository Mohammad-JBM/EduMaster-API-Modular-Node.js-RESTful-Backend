// Json-Web-Token
const jwt = require("jsonwebtoken");
// UserModel
const UserModel = require("./../models/user");

module.exports = async (req, res, next) => {
    const authHeader = req.header("Authorization")?.split(" ");
    if (authHeader?.length !== 2) {
        return res.status(403).json({
            message: "This Route is Protected And Your Access Denied."
        })
    }
    const token = authHeader[1];

    try {
        // Decode JWT
        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
        // Usermodel
        const user = await UserModel.findById(jwtPayload.id).lean();
        // Delete Password
        Reflect.deleteProperty(user, "password");

        req.user = user;
        next();

    } catch (error) {
        return res.json(error);
    }
}
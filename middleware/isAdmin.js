module.exports = async (req, res, next) => {
    const isAdmin = req.user.role === "ADMIN";
    if (isAdmin) {
        return next();
    }
    return res.status(403).json({
        message: "This Route is Only for ADMINS !",
    });
};
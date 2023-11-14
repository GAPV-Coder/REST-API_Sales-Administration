const { AppError } = require("../helpers/appError");
const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user.model");


const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError('Authentication failed. Token not provided.', 401)
        }

        const decoded = verifyToken(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id_user);

        if (!user) {
            throw new AppError('User not found', 404)
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const restrictTo = async (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                throw new AppError('Permission denied. You do not have access to this resource.', 403);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    protect,
    restrictTo
}
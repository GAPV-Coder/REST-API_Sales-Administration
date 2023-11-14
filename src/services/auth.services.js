const User = require('../models/user.model');
const Role = require('../models/role.model');
const {
    encryptPassword,
    comparePassword,
} = require('../helpers/encryptPassword');
const { generateToken } = require('../helpers/jwt');
const { AppError } = require('../helpers/appError');

class AuthServices {
    async registerUser(
        document_id,
        first_name,
        last_name,
        email,
        password,
        roleId,
    ) {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new AppError('Email already exists', 400);
            }

            const findRole = await Role.findById(roleId);
            console.log('ROLE', findRole);
            if (!findRole) {
                throw new AppError('Role not found', 404);
            }

            const hashedPassword = await encryptPassword(password);

            const newUser = await User.create({
                document_id,
                first_name,
                last_name,
                email,
                password: hashedPassword,
                role: findRole,
            });

            const token = generateToken({
                id_user: newUser._id,
                email: newUser.email,
            });

            return {
                user: { ...newUser._doc, password: undefined },
                token,
            };
        } catch (error) {
            console.log(error);
            throw new AppError('Register failed', 403);
        }
    }

    async loginUser(email, password) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AppError('Email not found', 404);
            }

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                throw new AppError('Password is incorrect', 400);
            }

            const token = generateToken({
                id_user: user._id,
                email: user.email,
            });

            return { user: { ...user._doc, password: undefined }, token }; 
        } catch (error) {
            throw new AppError('Login failed', 403);
        }
    }
}

module.exports = new AuthServices();
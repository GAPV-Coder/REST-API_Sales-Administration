const AuthServices = require('../services/auth.services');
const { catchAsync } = require('../helpers/catchAsync');
const { success, error } = require('../helpers/responses');

class AuthController {
    registerUser = catchAsync(async (req, res) => {
        const { document_id, first_name, last_name, email, password, role } =
            req.body;

        const { user, token } = await AuthServices.registerUser(
            document_id,
            first_name,
            last_name,
            email,
            password,
            role,
        );

        success({ res, message: 'User registered', data: { user, token } });
    });

    loginUser = catchAsync(async (req, res) => {
        const { email, password } = req.body;

        const { user, token } = await AuthServices.loginUser(email, password);

        success({ res, message: 'User logged in', data: { user, token } });
    });
}

module.exports = new AuthController();
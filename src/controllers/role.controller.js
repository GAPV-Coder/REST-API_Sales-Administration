const { catchAsync } = require('../helpers/catchAsync');
const RoleServices = require('../services/role.services');
const { success, error, serverError } = require('../helpers/responses');

class RoleController {
    createRole = catchAsync(async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return error({
                res,
                message: 'Role name is required',
                status: 400,
            });
        }

        const roleData = { name };

        const role = await RoleServices.createRole(roleData);

        return success({
            res,
            message: 'Role created successfully',
            data: role,
        });
    });
}

module.exports = new RoleController();

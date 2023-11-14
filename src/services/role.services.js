const Role = require('../models/role.model');

class RoleServices {
    async createRole(roleData) {
        const role = await Role.create(roleData);
        return role;
    }
}

module.exports = new RoleServices();

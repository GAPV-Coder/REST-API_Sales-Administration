const { Router } = require('express');
const roleRoutes = require('./role.routes');
const authRoutes = require('./auth.routes');

const routerApi = Router();

routerApi.use('/roles', roleRoutes);

routerApi.use('/auth', authRoutes);

module.exports = { routerApi };
"use strict";
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.get('/', () => {
    return 'Hello, World!';
});
module.exports = routes;

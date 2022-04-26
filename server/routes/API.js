const express = require('express');
const apiRouter = express.Router();

const recipeRouter = require('./recipes');
apiRouter.use('/recipes', recipeRouter);

module.exports = apiRouter;

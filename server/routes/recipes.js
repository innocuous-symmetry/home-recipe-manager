const express = require('express');
const recipeRouter = express.Router();
const client = require('../db/conn');

const success = "Connection successful.";
const disconnect = "Disconnected from database.";

// get all recipes in database
recipeRouter.route('/').get(async (req, res) => {
    const newClient = client();
    try {
        await newClient.connect().then(console.log(success));

        const results = await newClient.query("SELECT * FROM recipes");
        res.send(results.rows);
    } catch(e) {
        throw new Error(e);
    } finally {
        await newClient.end().then(console.log(disconnect));
    }
})

recipeRouter.route('/').post(async (req, res) => {
    const {
        name, author, source, recipe_text, recipe_details
    } = req.body;

    const newClient = client();
    const data = [name, author, source, recipe_text, recipe_details];

    const SQL = "INSERT INTO recipes (name, author, source, recipe_text, recipe_details) VALUES ($1, $2, $3, $4, $5)";

    try {
        await newClient.connect().then(console.log(success));

        const results = await newClient.query(SQL, [...data]);
        res.status(204).send("Data stored successfully.");
    } catch(e) {
        throw new Error(e);
    } finally {
        await newClient.end().then(console.log(disconnect));
    }
});

module.exports = recipeRouter;

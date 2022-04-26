const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require('dotenv').config({ path: './config.env' });
const PORT = process.env.PORT || 8088;

const apiRouter = require('./routes/API');
app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});

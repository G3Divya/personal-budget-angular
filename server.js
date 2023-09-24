const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use('/', express.static('public'));

// Load the budget data from budget.json using require
const budget = require('./budget.json');

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.use(cors());

app.listen(port, () => {
    console.log(`API app listening at http://localhost:${port}`);
});
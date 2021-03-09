const express = require('express');
const app = express();
const genres = require('./routes/genres');
const Joi = require('joi');

app.use(express.json());
app.use('/api/genres',genres);

app.get("/", (req,res) => {
    res.send("Please type this url ==> localhost:3000/api/genres/");
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
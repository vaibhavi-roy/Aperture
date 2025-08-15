const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
app.use(express.json());
const cors = require('cors');
app.use(cors());

const usersRoute = require('./routes/usersRoute');
const moviesRoute = require('./routes/moviesRoute');

app.use('/api/users', usersRoute);
app.use('/api/movies', moviesRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
const express = require('express');
const bodyParser = require('body-parser');
const taskrouter = require('./routes/tasks');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/tasks', taskrouter);

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
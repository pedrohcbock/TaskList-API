const express = require('express');
const bodyParser = require('body-parser');
const taskrouter = require('./routes/tasks');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(bodyParser.json());

app.use('/tasks', taskrouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

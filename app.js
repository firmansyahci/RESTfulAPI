require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT;
const cors = require('cors');
const morgan = require('morgan');

const router = require('./src/routers/index');

app.use(cors());
app.use(morgan('combined'));

app.use('/uploads', express.static("./uploads"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/v1', router);

app.listen(port, () => console.log(`App running Listen port ${port}`));
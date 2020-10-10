const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./Routes/routes.js');
const user = require('./Routes/user.js');
var cookieParser = require("cookie-parser");

const port = process.env.PORT || 7777;

var app = express();

app.use(cookieParser());

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
// Cross-Origin support for the app
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/route', router);
app.use('/user', user);

app.listen(port, () => console.log(`Listening on port ${port}...`));

'use strict';

require('dotenv').config(); //load additional setting into environment
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

//Routers
const indexRouter = require('./routes/index');
//const usersRouter = require("./routes/users");  //disable user routing
const catalogRouter = require('./routes/catalog');
//const contactRouter = require("./routes/contact");

const app = express();

// Set up mongoose connection, using local database for this project
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(helmet());
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use("/users", usersRouter);    //disable user routing
app.use('/catalog', catalogRouter); // Add catalog routes to middleware chain.
//app.use("/contact", contactRouter);  // Contact page

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

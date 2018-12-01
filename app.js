var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var auth = require('./auth')

require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenticateRouter = require('./routes/authenticate')
var userRouter = require('./routes/user')
var projectsRouter = require('./routes/projects')
var projectRouter = require('./routes/project')
var workRouter = require('./routes/work')
var workTimerRouter = require('./routes/workTimer')

var app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

var sessionStore = new SequelizeStore({
  db: require('./db/sessionStore'),
  expiration: 604800000, //1 week
})

app.use(session({
  store: sessionStore,
  // store: new FileStore({ ttl: 604800 }), //1 week
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

sessionStore.sync()

app.use(auth.initialize());
app.use(auth.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authenticate', authenticateRouter)
app.use('/user', userRouter)
app.use('/projects', projectsRouter)
app.use('/project', projectRouter)
app.use('/work', workRouter)
app.use('/workTimer', workTimerRouter)

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
  res.sendStatus(err.status || 500);
});

module.exports = app;

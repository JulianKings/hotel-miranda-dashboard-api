"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("passport"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _indexController = _interopRequireDefault(require("./controllers/indexController"));
var _userController = _interopRequireDefault(require("./controllers/userController"));
var _contactController = _interopRequireDefault(require("./controllers/contactController"));
var _roomController = _interopRequireDefault(require("./controllers/roomController"));
var _bookingController = _interopRequireDefault(require("./controllers/bookingController"));
var _loginController = _interopRequireDefault(require("./controllers/loginController"));
var _auth = require("./middleware/auth");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.set('jwt_secret_password', process.env.JWT_SECURE_KEY);
app.use((0, _morgan["default"])('dev'));
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use((0, _expressSession["default"])({
  secret: "cats",
  resave: false,
  saveUninitialized: true
}));
app.use(_passport["default"].session());
var indexRouterHandler = (0, _indexController["default"])();
app.use('/', indexRouterHandler);
var userRouterHandler = (0, _userController["default"])(_passport["default"]);
app.use('/user', _passport["default"].authenticate('jwt', {
  session: false
}), userRouterHandler);
var contactRouterHandler = (0, _contactController["default"])(_passport["default"]);
app.use('/contact', _passport["default"].authenticate('jwt', {
  session: false
}), contactRouterHandler);
var roomRouterHandler = (0, _roomController["default"])(_passport["default"]);
app.use('/room', _passport["default"].authenticate('jwt', {
  session: false
}), roomRouterHandler);
var bookingRouterHandler = (0, _bookingController["default"])(_passport["default"]);
app.use('/bookings', _passport["default"].authenticate('jwt', {
  session: false
}), bookingRouterHandler);
var loginRouterHandler = (0, _loginController["default"])(_passport["default"]);
app.use('/login', loginRouterHandler);
(0, _auth.applyPassportMiddleware)(_passport["default"]);
var _default = exports["default"] = app;
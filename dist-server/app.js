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
var _index = _interopRequireDefault(require("./routes/index"));
var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));
var _contactRoutes = _interopRequireDefault(require("./routes/contactRoutes"));
var _roomRoutes = _interopRequireDefault(require("./routes/roomRoutes"));
var _bookingRoutes = _interopRequireDefault(require("./routes/bookingRoutes"));
var _loginRoutes = _interopRequireDefault(require("./routes/loginRoutes"));
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
app.use('/', _index["default"]);
var userRouterHandler = (0, _userRoutes["default"])(_passport["default"]);
app.use('/user', _passport["default"].authenticate('jwt', {
  session: false
}), userRouterHandler);
var contactRouterHandler = (0, _contactRoutes["default"])(_passport["default"]);
app.use('/contact', _passport["default"].authenticate('jwt', {
  session: false
}), contactRouterHandler);
var roomRouterHandler = (0, _roomRoutes["default"])(_passport["default"]);
app.use('/room', _passport["default"].authenticate('jwt', {
  session: false
}), roomRouterHandler);
var bookingRouterHandler = (0, _bookingRoutes["default"])(_passport["default"]);
app.use('/bookings', _passport["default"].authenticate('jwt', {
  session: false
}), bookingRouterHandler);
var loginRouterHandler = (0, _loginRoutes["default"])(_passport["default"]);
app.use('/login', loginRouterHandler);
(0, _auth.applyPassport)(_passport["default"]);
var _default = exports["default"] = app;
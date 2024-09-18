"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  }
});
var userModel = _mongoose["default"].model("user", userSchema);
var _default = exports["default"] = userModel;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var contactSchema = new Schema({
  customer_name: {
    type: String,
    required: true
  },
  customer_mail: {
    type: String,
    required: true
  },
  customer_phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});
var contactModel = _mongoose["default"].model("contact", contactSchema);
var _default = exports["default"] = contactModel;
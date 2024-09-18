"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var bookingSchema = new Schema({
  customer_name: {
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
  room: {
    type: Schema.Types.ObjectId,
    ref: "room",
    required: true
  },
  check_in: {
    type: Date,
    required: true
  },
  check_out: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: true
  }
});
var bookingModel = _mongoose["default"].model("booking", bookingSchema);
var _default = exports["default"] = bookingModel;
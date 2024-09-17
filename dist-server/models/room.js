"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var roomSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  floor: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  amenities: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  offer: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});
var roomModel = _mongoose["default"].model("room", roomSchema);
var _default = exports["default"] = roomModel;
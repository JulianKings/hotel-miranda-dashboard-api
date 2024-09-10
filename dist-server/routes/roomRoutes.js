"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _express = _interopRequireDefault(require("express"));
var _roomController = require("../controllers/roomController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _default(passport) {
  var router = _express["default"].Router();
  router.get('/', _roomController.room_all);
  router.post('/', _roomController.create_room);
  router.get('/:id', _roomController.room_by_id);
  router.put('/:id', _roomController.update_room);
  router["delete"]('/:id', _roomController.delete_room);
  return router;
}
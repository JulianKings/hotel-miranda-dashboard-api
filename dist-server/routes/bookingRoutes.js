"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _express = _interopRequireDefault(require("express"));
var _bookingController = require("../controllers/bookingController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _default(passport) {
  var router = _express["default"].Router();
  router.get('/', _bookingController.booking_all);
  router.post('/', _bookingController.create_booking);
  router.get('/:id', _bookingController.booking_by_id);
  router.put('/:id', _bookingController.update_booking);
  router["delete"]('/:id', _bookingController.delete_booking);
  return router;
}
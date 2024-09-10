"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _express = _interopRequireDefault(require("express"));
var _contactController = require("../controllers/contactController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _default(passport) {
  var router = _express["default"].Router();
  router.get('/', _contactController.contacts_all);
  router.post('/', _contactController.create_contact);
  router.get('/:id', _contactController.contact_by_id);
  router.put('/:id', _contactController.update_contact);
  router["delete"]('/:id', _contactController.delete_contact);
  return router;
}
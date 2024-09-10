"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get('/', _userController.users_all);
router.post('/', _userController.create_user);
router.get('/:id', _userController.users_by_id);
router.put('/:id', _userController.update_user);
router["delete"]('/:id', _userController.delete_user);
var _default = exports["default"] = router;
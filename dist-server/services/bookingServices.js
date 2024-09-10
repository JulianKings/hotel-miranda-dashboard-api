"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookingService = void 0;
var _path = _interopRequireDefault(require("path"));
var _jsonParser = require("../util/jsonParser");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BookingService = exports.BookingService = /*#__PURE__*/function () {
  function BookingService() {
    _classCallCheck(this, BookingService);
  }
  return _createClass(BookingService, [{
    key: "loadAll",
    value: function loadAll() {
      return (0, _jsonParser.readJsonFile)(_path["default"].resolve(__dirname, "../data/bookings.json"));
    }
  }, {
    key: "loadBookingById",
    value: function loadBookingById(id) {
      var bookings = (0, _jsonParser.readJsonFile)(_path["default"].resolve(__dirname, "../data/bookings.json"));
      var booking = bookings.filter(function (bookingElement) {
        return bookingElement.id === id;
      });
      if (booking.length > 0) {
        return booking[0];
      } else {
        return null;
      }
    }
  }, {
    key: "updateBooking",
    value: function updateBooking(bookingObject) {
      (0, _jsonParser.updateJsonFile)(_path["default"].resolve(__dirname, "../data/bookings.json"), bookingObject);
      return bookingObject;
    }
  }, {
    key: "deleteBooking",
    value: function deleteBooking(bookingId) {
      (0, _jsonParser.deleteFromJsonFile)(_path["default"].resolve(__dirname, "../data/bookings.json"), {
        id: bookingId
      });
      return {
        id: bookingId
      };
    }
  }]);
}();
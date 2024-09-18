"use strict";

var _faker = require("@faker-js/faker");
var _bookings = _interopRequireDefault(require("./models/bookings"));
var _user = _interopRequireDefault(require("./models/user"));
var _contact = _interopRequireDefault(require("./models/contact"));
var _room = _interopRequireDefault(require("./models/room"));
var _mongoose = _interopRequireDefault(require("mongoose"));
require("dotenv/config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function createRandomUser() {
  return {
    _id: undefined,
    name: _faker.faker.internet.userName(),
    full_name: _faker.faker.person.fullName(),
    password: "$2a$10$3ZaCp.V0lvHyqyle9aKfmOX2APUb960o1oX0EWFNFtX4/lyMCRkcG",
    // test
    mail: _faker.faker.internet.email(),
    profile_picture: _faker.faker.image.avatar(),
    start: new Date(_faker.faker.date.recent()),
    description: _faker.faker.person.jobTitle(),
    contact: _faker.faker.phone.number({
      style: 'international'
    }),
    status: _faker.faker.helpers.arrayElement(['active', 'inactive']),
    position: _faker.faker.helpers.arrayElement(['manager', 'room_service', 'reception'])
  };
}
function createRandomContact() {
  return {
    _id: undefined,
    customer_name: _faker.faker.person.fullName(),
    customer_mail: _faker.faker.internet.email(),
    customer_phone: _faker.faker.phone.number({
      style: "international"
    }),
    date: new Date(_faker.faker.date.recent()),
    status: _faker.faker.helpers.arrayElement(['active', 'archived']),
    subject: _faker.faker.lorem.lines(1),
    comment: _faker.faker.lorem.paragraph({
      min: 6,
      max: 10
    })
  };
}
function createRandomRoom() {
  return {
    _id: undefined,
    type: _faker.faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite']),
    floor: "Floor " + _faker.faker.helpers.arrayElement(['A', 'B', 'C']) + "-" + _faker.faker.number["int"]({
      min: 0,
      max: 10
    }),
    number: _faker.faker.number["int"]({
      min: 40,
      max: 100
    }),
    amenities: [],
    images: _faker.faker.image.url(),
    price: _faker.faker.number["int"]({
      min: 40,
      max: 100
    }),
    offer: _faker.faker.number["int"]({
      min: 40,
      max: 100
    }),
    status: _faker.faker.helpers.arrayElement(['available', 'maintenance', 'booked']),
    description: _faker.faker.lorem.paragraph({
      min: 3,
      max: 8
    })
  };
}
var BookingGenerator = /*#__PURE__*/function () {
  function BookingGenerator(rList) {
    _classCallCheck(this, BookingGenerator);
    _defineProperty(this, "roomList", void 0);
    this.roomList = rList;
  }
  return _createClass(BookingGenerator, [{
    key: "createRandomBooking",
    value: function createRandomBooking() {
      var roomItem = getRandomInt(rooms.length);
      return {
        _id: undefined,
        customer_name: _faker.faker.person.fullName(),
        date: new Date(_faker.faker.date.recent()),
        status: _faker.faker.helpers.arrayElement(['checking_out', 'checking_in', 'in_progress']),
        room: rooms[roomItem]._id !== undefined ? rooms[roomItem]._id : '',
        check_in: new Date(_faker.faker.date.past()),
        check_out: new Date(_faker.faker.date.future()),
        notes: _faker.faker.lorem.paragraph({
          min: 3,
          max: 8
        })
      };
    }
  }]);
}();
var users = _faker.faker.helpers.multiple(createRandomUser, {
  count: 20
});
var contacts = _faker.faker.helpers.multiple(createRandomContact, {
  count: 20
});
var rooms = _faker.faker.helpers.multiple(createRandomRoom, {
  count: 20
});
var bookings = [];
function concatenateDefaultUsers() {
  var defaultDeveloper = {
    "_id": undefined,
    "name": "Developer",
    "full_name": "Julian Reyes",
    "password": "$2a$10$/QfwEmoOALQrmk8RGIoMYOkmel5NTQJ8MmQJPjgGAM/MR5JRkpng2",
    "mail": "julianreyeslahoz@gmail.com",
    "profile_picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSwWsVwCB7k3J9sTCSX2C352hGm0cbuANvZw&s",
    "start": "2023-08-16T00:00:00.000Z",
    "description": "Legacy Functionality Producer",
    "contact": "311 093 5870",
    "status": "active",
    "position": "manager"
  };
  var defaultAdmin = {
    "_id": undefined,
    "name": "admin",
    "full_name": "Juana Dietrich",
    "password": "$2a$10$A9NlYzY3NkTdx.m1KjK8PO5CfHxcGrz44MOWunlSQf9uinEj6VU9u",
    "mail": "Juana67@yahoo.com",
    "profile_picture": "./src/assets/profile2.png",
    "start": "2024-06-20T12:58:36.794Z",
    "description": "Dynamic Tactics Specialist",
    "contact": "685 231 8978",
    "status": "inactive",
    "position": "reception"
  };
  var defaultDuck = {
    "_id": undefined,
    "name": "Patoman",
    "full_name": "Pato Duckensen",
    "password": "$2a$10$gpti1uGOyy0Lli6vMM.W4uRgg6Y6nn8qttzwQ0s8Z.DKUmPwUwyJC",
    "mail": "duck@duckerson.com",
    "profile_picture": "./src/assets/profile.png",
    "start": "2024-08-30T00:00:00.000Z",
    "description": "Duck Duckenson Dunken",
    "contact": "123456789",
    "status": "active",
    "position": "manager"
  };
  var defaultTest = {
    _id: undefined,
    "name": "test",
    "full_name": "Julián Reyes",
    "password": "$2a$10$3ZaCp.V0lvHyqyle9aKfmOX2APUb960o1oX0EWFNFtX4/lyMCRkcG",
    "mail": "julli123@hotmail.es",
    "profile_picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSwWsVwCB7k3J9sTCSX2C352hGm0cbuANvZw&s",
    "start": "2024-08-30T00:00:00.000Z",
    "description": "testcito",
    "contact": "684135340",
    "status": "inactive",
    "position": "manager"
  };
  users = users.concat([defaultDeveloper, defaultAdmin, defaultDuck, defaultTest]);
}
main()["catch"](function (err) {
  return console.log(err);
});
function main() {
  return _main.apply(this, arguments);
}
function _main() {
  _main = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var mongoUri, book;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _mongoose["default"].set("strictQuery", false);
          mongoUri = process.env.MONGODB_URI !== undefined ? process.env.MONGODB_URI : '';
          console.log("Debug: About to connect");
          _context.next = 5;
          return _mongoose["default"].connect(mongoUri);
        case 5:
          console.log("Debug: Should be connected?");
          concatenateDefaultUsers();
          _context.next = 9;
          return createUsers();
        case 9:
          _context.next = 11;
          return createContacts();
        case 11:
          _context.next = 13;
          return createRooms();
        case 13:
          book = new BookingGenerator(rooms);
          bookings = _faker.faker.helpers.multiple(book.createRandomBooking, {
            count: 20
          });
          _context.next = 17;
          return createBookings();
        case 17:
          console.log("Debug: Closing mongoose");
          _mongoose["default"].connection.close();
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}
function createUser(_x, _x2) {
  return _createUser.apply(this, arguments);
}
function _createUser() {
  _createUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(user, index) {
    var userMod;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          userMod = new _user["default"](user);
          _context2.next = 3;
          return userMod.save();
        case 3:
          users[index] = userMod;
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _createUser.apply(this, arguments);
}
function createUsers() {
  return _createUsers.apply(this, arguments);
}
function _createUsers() {
  _createUsers = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var concatPromise;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log('Adding users');
          concatPromise = [];
          users.forEach(function (user, index) {
            concatPromise.push(createUser(user, index));
          });
          _context3.next = 5;
          return Promise.all(concatPromise);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _createUsers.apply(this, arguments);
}
function createContact(_x3, _x4) {
  return _createContact.apply(this, arguments);
}
function _createContact() {
  _createContact = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(contact, index) {
    var contactMod;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          contactMod = new _contact["default"](contact);
          _context4.next = 3;
          return contactMod.save();
        case 3:
          contacts[index] = contactMod;
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _createContact.apply(this, arguments);
}
function createContacts() {
  return _createContacts.apply(this, arguments);
}
function _createContacts() {
  _createContacts = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var concatPromise;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          console.log('Adding contact');
          concatPromise = [];
          contacts.forEach(function (contact, index) {
            concatPromise.push(createContact(contact, index));
          });
          _context5.next = 5;
          return Promise.all(concatPromise);
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _createContacts.apply(this, arguments);
}
function createRoom(_x5, _x6) {
  return _createRoom.apply(this, arguments);
}
function _createRoom() {
  _createRoom = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(room, index) {
    var roomMod;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          roomMod = new _room["default"](room);
          _context6.next = 3;
          return roomMod.save();
        case 3:
          rooms[index] = roomMod;
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _createRoom.apply(this, arguments);
}
function createRooms() {
  return _createRooms.apply(this, arguments);
}
function _createRooms() {
  _createRooms = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var concatPromise;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          console.log('Adding rooms');
          concatPromise = [];
          rooms.forEach(function (room, index) {
            concatPromise.push(createRoom(room, index));
          });
          _context7.next = 5;
          return Promise.all(concatPromise);
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _createRooms.apply(this, arguments);
}
function createBooking(_x7, _x8) {
  return _createBooking.apply(this, arguments);
}
function _createBooking() {
  _createBooking = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(booking, index) {
    var bookingMod;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          bookingMod = new _bookings["default"](booking);
          _context8.next = 3;
          return bookingMod.save();
        case 3:
          bookings[index] = bookingMod;
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _createBooking.apply(this, arguments);
}
function createBookings() {
  return _createBookings.apply(this, arguments);
}
function _createBookings() {
  _createBookings = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var concatPromise;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          console.log('Adding bookings');
          concatPromise = [];
          bookings.forEach(function (booking, index) {
            concatPromise.push(createBooking(booking, index));
          });
          _context9.next = 5;
          return Promise.all(concatPromise);
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _createBookings.apply(this, arguments);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
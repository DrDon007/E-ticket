"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../models/user"));

var _passport = _interopRequireWildcard(require("passport"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _jwtConfig = require("../config/jwtConfig");

var router = _express["default"].Router();

var BCRYPT_SALTS_ROUNDS = 12;
/**
 * GET To fetch users
 */

router.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
/* POST registers new user. */

router.post("/register", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, username, password, email, passwordHash, user;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password, email = _req$body.email;
            _context2.prev = 1;
            _context2.next = 4;
            return _bcrypt["default"].hash(password, BCRYPT_SALTS_ROUNDS);

          case 4:
            passwordHash = _context2.sent;
            user = new _user["default"]({
              username: username,
              passwordHash: passwordHash,
              email: email
            });
            _context2.next = 8;
            return user.save();

          case 8:
            res.status(200).send({
              status: true,
              message: "user created",
              user: user
            });
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            console.log("errr", _context2.t0);
            res.status(400).send({
              status: false,
              message: "user not created"
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 11]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
/* POST login new user. */

router.post("/login", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$body2, username, password, user, comparePassword, jwt_token;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
            console.log(username, password);
            _context3.prev = 2;
            _context3.next = 5;
            return _user["default"].findOne({
              username: username
            }).exec();

          case 5:
            user = _context3.sent;
            console.log(user);

            if (user) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              status: false,
              message: "user not found"
            }));

          case 9:
            _context3.next = 11;
            return _bcrypt["default"].compare(password, user.passwordHash);

          case 11:
            comparePassword = _context3.sent;

            if (!comparePassword) {
              res.status(200).send({
                status: true,
                message: "Ooops! wrong password"
              });
            }

            jwt_token = _jsonwebtoken["default"].sign({
              id: user.id
            }, _jwtConfig.JWTSecret);
            res.status(200).send({
              status: true,
              data: {
                user: user,
                jwt_token: jwt_token
              }
            });
            _context3.next = 21;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](2);
            console.log("errr", _context3.t0);
            res.status(400).send({
              status: false,
              message: "user not created"
            });

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 17]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireWildcard(require("express"));

var _user2 = _interopRequireDefault(require("../models/user"));

var _profile = _interopRequireDefault(require("../models/profile"));

var _passport = _interopRequireDefault(require("passport"));

var router = _express["default"].Router();
/* GET users listing. */


router.get("/", function (req, res, next) {
  _passport["default"].authenticate("jwt", {
    session: false
  }, function (err, user, info) {})(req, res, next);
});
router.get("/users", function (req, res, next) {
  _user2["default"].findById(req.params.id).then(function (data) {
    res.json({
      success: true,
      users: data
    });
  });
});
router.post("/createProfile", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _passport["default"].authenticate('jwt', {
              session: false
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, user, info) {
                var _user, profile, success, userData, userUpdated;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        console.log('passport variables', err, user, info);

                        if (user) {
                          _context.next = 3;
                          break;
                        }

                        return _context.abrupt("return", res.status(403).send({
                          message: 'Unauthorized Access'
                        }));

                      case 3:
                        _context.prev = 3;
                        _user = info.user;

                        if (!_user.profile) {
                          _context.next = 7;
                          break;
                        }

                        return _context.abrupt("return", res.status(200).send({
                          "message": "Profile already Exist"
                        }));

                      case 7:
                        profile = new _profile["default"]({
                          user: _user._id,
                          firstName: req.body.firstName,
                          lastName: req.body.lastName,
                          dateOfBirth: req.body.dateOfBirth,
                          PlaceOfBirth: req.body.PlaceOfBirth,
                          currentPlace: req.body.currentPlace,
                          relationshipStatus: req.body.relationshipStatus,
                          profilePhoto: req.body.profilePhoto,
                          coverPhoto: req.body.coverPhoto,
                          bookings: []
                        });
                        _context.next = 10;
                        return profile.save();

                      case 10:
                        success = _context.sent;
                        console.log('success', success);

                        if (!success) {
                          _context.next = 20;
                          break;
                        }

                        _context.next = 15;
                        return _user2["default"].findById(_user._id).exec();

                      case 15:
                        userData = _context.sent;
                        console.log('user', _user, userData, _user._id);
                        userData.profile = success._id;
                        userUpdated = userData.save();

                        if (userUpdated) {
                          res.status(200).send({
                            "message": "Profile created"
                          });
                        }

                      case 20:
                        _context.next = 26;
                        break;

                      case 22:
                        _context.prev = 22;
                        _context.t0 = _context["catch"](3);
                        console.log('error', _context.t0);
                        res.status(500).send({
                          "error": _context.t0.message
                        });

                      case 26:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[3, 22]]);
              }));

              return function (_x4, _x5, _x6) {
                return _ref2.apply(this, arguments);
              };
            }())(req, res, next);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
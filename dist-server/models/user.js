"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var UserSchema = new _mongoose["default"].Schema({
  username: {
    type: "string",
    required: true
  },
  email: {
    type: "string",
    required: true
  },
  passwordHash: {
    type: "string",
    required: true
  }
});
UserSchema["static"]("findById", function (id) {
  return this.find({
    id: id
  });
});

var User = _mongoose["default"].model("User", UserSchema);

var _default = User;
exports["default"] = _default;
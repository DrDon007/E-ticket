"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var List = new _mongoose["default"].Schema({
  trainname: {
    type: 'string',
    required: true
  },
  tranPNR: {
    type: 'string',
    required: true
  } // from: {type: 'string', required: true},
  // to: {type: 'string', required: true}

});
List["static"]("findById", function (id) {
  return this.find({
    id: id
  });
});

var trainList = _mongoose["default"].model("trainList", List);

var _default = trainList;
exports["default"] = _default;
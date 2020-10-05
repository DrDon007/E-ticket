"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var ProfileSchema = new _mongoose["default"].Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Person"
  },
  firstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  PlaceOfBirth: {
    type: {
      type: String,
      // Don't do `{ location: { type: String } }`
      "enum": ["Point"],
      // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  currentPlace: {
    type: {
      type: String,
      // Don't do `{ location: { type: String } }`
      "enum": ["Point"],
      // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  relationshipStatus: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: false
  },
  coverPhoto: {
    type: String,
    required: false
  }
});

var Profile = _mongoose["default"].model("Profile", ProfileSchema);

var _default = Profile;
exports["default"] = _default;
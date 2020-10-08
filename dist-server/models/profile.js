"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _booking = require("./booking");

var ProfileSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
  },
  bookings: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }]
});
var Profile = (0, _mongoose.model)("Profile", ProfileSchema);
var _default = Profile;
exports["default"] = _default;
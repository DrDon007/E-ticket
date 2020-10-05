"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _trainList = _interopRequireDefault(require("../models/trainList"));

var router = _express["default"].Router();
/* GET Train listing. */


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/trainlists", function (req, res, next) {
  _trainList["default"].findById(req.params.id).then(function (data) {
    res.json({
      success: true,
      trainLists: data
    });
  });
});
router.post("/trainlist", function (req, res, next) {
  var list = new _trainList["default"](req.body);
  list.save(function (err, data) {
    if (err) {
      return res.sendStatus(400).send({
        success: false,
        err: err
      });
    }

    res.send({
      success: true,
      trainList: data
    });
  });
});
var _default = router;
exports["default"] = _default;
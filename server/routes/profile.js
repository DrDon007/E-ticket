import express, { response } from "express";
import User from "../models/user";
import passport from "passport";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {})(
    req,
    res,
    next
  );
});

router.get("/users", (req, res, next) => {
  User.findById(req.params.id).then((data) => {
    res.json({
      success: true,
      users: data,
    });
  });
});

router.post("/user", (req, res, next) => {
  const user = new User(req.body);
  user.save((err, data) => {
    if (err) {
      return res.sendStatus(400).send({
        success: false,
        err: err,
      });
    }
    res.send({
      success: true,
      user: data,
    });
  });
});
export default router;

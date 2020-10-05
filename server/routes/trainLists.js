import express, { response } from "express";
import trainList from "../models/trainList";

var router = express.Router();

/* GET Train listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
  });

  router.get("/trainlists", (req, res, next) => {
    trainList.findById(req.params.id).then((data) => {
      res.json({
        success: true,
        trainLists: data,
      });
    });
  });

  router.post("/trainlist", (req, res, next) => {
    const list = new trainList(req.body);
    list.save((err, data) => {
      if (err) {
        return res.sendStatus(400).send({
          success: false,
          err: err,
        });
      }
      res.send({
        success: true,
        trainList: data,
      });
    });
  });
  export default router;
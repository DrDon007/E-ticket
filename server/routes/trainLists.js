import express, { response } from "express";
import passport, { authenticate } from "passport";
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
    passport.authenticate('jwt', {session:false}, async (err,user,info) => {
      try {
        const {role} = info;
        if(role !== "admin") {
          return res.sendStatus(403).send({
            success: false,
            err: "unauthorized access",
          });
        }
        const list = new trainList(req.body);
        const savedList = list.save();
        if(savedList) {
          res.status(200).send({
                success: true,
                trainList: data,
          });
        }
      }catch(err) {
        return res.sendStatus(400).send({
          success: false,
          err: err.message,
        });
      }
     
    }) (req,res,next)
    
  });
  export default router;
import express, { response } from "express";
import passport, { authenticate } from "passport";
import trainList from "../models/trainList";
import trainSearch from "../models/trainSearch";

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

  router.post("/train/add", (req, res, next) => {
    console.log('req', req);
    passport.authenticate('jwt', {session:false}, async (err,user,info) => {
      try {
        const {role} = info;
        if(role.toLowerCase() !== ("admin")) {
          return res.status(403).send({
            success: false,
            err: "unauthorized access",
          });
        }
        const list = new trainList(req.body);
        const savedList = list.save();
        if(savedList) {
          res.status(200).send({
                success: true,
                message : "Train Added",
          });
        }
      }catch(err) {
        console.log('error', err);
        return res.status(400).send({
          success: false,
          err: err.message,
        });
      }
     
    }) (req,res,next)
    
  });

/* delete train */
router.post("/trainlist/delete", (req, res, next) => {
  
  passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    try {
        const trainList = trainList.findById(req.trainList.id).exec();
        trainList.status = false;
        const trainListDel = await trainList.save();
        if(trainListDel) {
                res.status(200).send({message : "Train has been deleted"})   
        }
        
        
    }catch(err) {
        console.log('err', err);
        res.status(500).send(err.message);
    }    
})(
    req,
    res,
    next
  );

});

router.get("/search/", (req, res, next) => {
  trainList.find({ 'startTo': req.body.from, 'age': req.body.to }).then((data) => {
    res.json({
      success: true,
      trainLists: data,
    });
  });
});


  export default router;
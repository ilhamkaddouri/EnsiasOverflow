const router = require("express").Router();
const User = require("../model/user");
const Question = require("../model/question");
const tag = require("../model/tag");

var mongoose = require("mongoose");
const verify = require("../routes/verifyToken");
const { findById } = require("../model/user");
const multer = require("multer");

router.post("/addtag", (req, res) => {
  // let user_id = req.user;
  const Tag = new tag({
    tagName: req.body.tagName,
    tagDescription: req.body.tagDesc,
  });
  try {
    Tag.save();
    res.json({
       tag_id: Tag._id,
       tagName: Tag.tagName,
       desc: Tag.tagDescription,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("all",(req,res)=>{

    tag.find()
    .populate("user")
    .exec((err, questions) => {
        if (err) return  res.status(500).send(err);
        res.status(200).json(questions);
        
    });

})

module.exports = router;

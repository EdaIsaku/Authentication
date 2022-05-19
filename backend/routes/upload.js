const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  dest: "uploads/",
});

router.post("/imageUpload", upload.array("photo", 3), (req, res) => {
  console.log("file", req.files);
  res.status(200).send({
    message: "success!",
  });
});
// router.post("/imageUpload", upload.single("photo"), (req, res) => {
//   console.log("file", req.files);
//   res.status(200).send({
//     message: "success!",
//   });
// });

//Ika se sjam steka juaj une? qe keni bere kete next level shit aman sa tallesh
//tani do shohesh lajme te ntv, aaa? do shohesh ato qe shkruan grisela pra, do programoj edaa elhamdulilah
//edhe une do bej bukur kete te pakten, dhe me 3 foto, po me ate sliderin se dukej mire

module.exports = router;

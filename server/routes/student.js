const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentControllers");

router.get("/",studentController.view); 

router.get("/datas",studentController.datas); 

router.get("/adduser",studentController.adduser); 
router.post("/adduser",studentController.save);

router.get("/edituser/:id",studentController.edituser); 
router.post("/edituser/:id",studentController.edit);

router.get("/deleteuser/:id",studentController.delete);

//router.get("/datas",studentController.verify);

module.exports = router;
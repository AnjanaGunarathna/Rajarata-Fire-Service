
const express = require("express");
const { create, getAll, getOne, update, deleteUser } = require("../controller/Feedbackuser");

const router = express.Router();

router.post("/create", create);
router.get("/getall", getAll);
router.get("/getone/:id", getOne);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteUser);

module.exports = router;

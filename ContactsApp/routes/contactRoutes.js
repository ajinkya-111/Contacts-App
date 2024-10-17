const express = require("express");
const router  = express.Router();
const {getContact,createContact,getIContact,updateContact,deleteContact} = require("../controllers/contactControllers.js")
const validateToken = require("../middleware/validateTokenHandler")
router.use(validateToken);
router.route("/").get(getContact).post(createContact)
router.route("/:id").get(getIContact).put(updateContact).delete(deleteContact)


module.exports= router;
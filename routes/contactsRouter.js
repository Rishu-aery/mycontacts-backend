const express = require("express");
const router = express.Router();
const { getContact, createContact, updateContact, deleteContact, getContactById } = require("../controllers/contact-controller.js");
const { validateToken } = require("../middleware/validate-token-handler.js");

router.use(validateToken);

router.route("/").get(getContact);

router.route("/").post(createContact);

router.route("/:id").get(getContactById);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
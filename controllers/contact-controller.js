const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact-models.js");

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  let { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("name, email, phone is required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(200).json(contact);
});

const getContactById = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(400);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contacts);
});

const updateContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id);
    if (!contacts) {
      res.status(400);
      throw new Error("Contact not found!");
    }

    if (contacts.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Users don't have permission to update other users contacts!")            
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id);

    if (!contacts) {
        res.status(400);
        throw new Error("Contact not found!");
    }

    if (contacts.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Users don't have permission to delete other users contacts!")            
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Contact Deleted",
      contact: contacts,
    });
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContactById,
};

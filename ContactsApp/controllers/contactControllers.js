const asyncHandler = require("express-async-handler")
const express = require("express");
const Contact = require("../models/contactModels.js")
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})

const getIContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("this contact is not available")

    }
    res.status(200).json(contact)
})

const createContact = asyncHandler(async (req, res) => {
    
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    })
    res.status(201).json(contact)
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("this contact is not available")

    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user doesn't have permission to update other user's contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error("this contact is not available")

    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user doesn't have permission to update other user's contacts")
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact)
})
module.exports = {
    getContact, createContact, getIContact
    , updateContact, deleteContact
}
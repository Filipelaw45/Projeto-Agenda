import contactsModel from '../models/contactsModel.js';

const getContacts = async (req, res) => {
  const contacts = await contactsModel.getContacts(req.userId);
  return res.status(200).json(contacts);
};

const createContact = async (req, res) => {
  const createdContact = await contactsModel.createContact(req.userId, req.body);
  return res.status(201).json(createdContact);
};

const deleteContact = async (req, res) => {
  const { userId } = req;
  const contactId = req.params.id;
  await contactsModel.deleteContact(userId, contactId);
  return res.status(204).json();
};

const updateContact = async (req, res) => {
  const { userId } = req;
  const contactId = req.params.id;
  await contactsModel.updateContact(userId, contactId, req.body);
  return res.status(204).json();
};

export default {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
};

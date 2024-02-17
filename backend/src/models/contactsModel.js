import connection from './connection.js';

const getContacts = async (userID) => {
  const query = 'SELECT ID_contact as contactID, contact_name as contactName, phone_number as phoneNumber FROM contacts WHERE ID_user = ?';
  const [contacts] = await connection.execute(query, [userID]);
  return contacts;
};

const createContact = async (id, contact) => {
  const { name, phoneNumber } = contact;
  const query = 'INSERT INTO contacts(ID_user, contact_name, phone_number) VALUES (?, ?, ?)';
  const [createdUser] = await connection.execute(query, [id, name, phoneNumber]);
  return { insertId: createdUser.insertId };
};

const deleteContact = async (userId, contactId) => {
  const [removedContact] = await connection.execute('DELETE FROM contacts WHERE ID_user = ? AND ID_contact = ?', [userId, contactId]);
  return removedContact;
};

const updateContact = async (userId, contactId, data) => {
  const { contactName, phoneNumber } = data;
  const query = 'UPDATE contacts SET contact_name = ?, phone_number = ? WHERE ID_contact = ? AND ID_user = ?';
  // eslint-disable-next-line max-len
  const [updatedUser] = await connection.execute(query, [contactName, phoneNumber, contactId, userId]);
  return updatedUser;
};

export default {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
};

const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const getContact = contacts.find(contact => contact.id === String(contactId));

  return getContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === String(contactId));
  const newContactList = contacts.filter((_, index) => index !== idx);

  if (newContactList === -1) {
    return null;
  }

  await fs.writeFile(contactsPath, JSON.stringify(newContactList));

  return contacts[idx];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

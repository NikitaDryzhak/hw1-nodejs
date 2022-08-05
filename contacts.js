const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const file = await fs.readFile(contactsPath);
  return JSON.parse(file);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => {
    return contact.id == contactId;
  });
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const filteredContacts = allContacts.filter((contact) => {
    return contact.id != contactId;
  });

  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return filteredContacts;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(2), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

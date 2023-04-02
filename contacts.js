const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

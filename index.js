const contactsTodo = require('./contacts');
const argv = require('yargs').argv;

const { listContacts, getContactById, addContact, removeContact } = contactsTodo;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      console.log(`contact name: ${name} added`);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      if (!removedContact) {
        console.log(`contact with id: ${id} not found`);

        return;
      }
      console.table(removedContact);
      console.log(`contact id: ${id} deleted`);

      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

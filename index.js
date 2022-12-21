const contactsTodo = require('./contacts');
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsTodo.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await contactsTodo.getContactById(id);
      console.table(contact);
      break;

    case 'add':
      const newContact = await contactsTodo.addContact(name, email, phone);
      console.table(newContact);
      console.log(`contact name: ${name} added`);
      break;

    case 'remove':
      const removedContact = await contactsTodo.removeContact(id);
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

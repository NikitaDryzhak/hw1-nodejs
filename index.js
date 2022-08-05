const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const products = await contacts.listContacts();
      if (!products) {
        throw new Error("product not found");
      }
      console.log(products);
      break;

    case "get":
      const product = await contacts.getContactById(id);
      if (!product) {
        throw new Error("product not found");
      }
      console.log(product);
      break;

    case "add":
      const newProduct = contacts.addContact(name, email, phone);
      console.log(newProduct);
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.log("Unknown action type!");
  }
}

invokeAction(argv);

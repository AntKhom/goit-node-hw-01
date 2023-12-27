// contacts.js
const fs = require('fs/promises');
const {nanoid} = require('nanoid');
// Раскомментируй и запиши значение

const contactsPath = './db/contacts.json';


// TODO: задокументировать каждую функцию
const listContacts = async () => {
    // ...твой код. Возвращает массив контактов.
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

const getContactById = async(contactId)=> {
    // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
}

const removeContact = async(contactId)=> {
    // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    };
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
    // contacts.filter(contact => contact.id !== contactId);
    // return await getContactById(contactId) || null;
}

const addContact = async (data)=> {
    // ...твой код. Возвращает объект добавленного контакта. 
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    const isExistingContact = ({ name }) => contacts.some(contact => contact.name === name); 
    if (isExistingContact(newContact)) {
        console.log(`contact with name ${newContact.name} already existing`);
        return newContact;
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
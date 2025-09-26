import { Contact } from '../models/Contact.js';

//ContactService class - mirrors the Java implementation for managing contacts

export class ContactService {
    constructor() {
        this.contactList = [];
        this.loadFromStorage();
    }

    addContact(newContact) {
        // Check if contact with same ID already exists
        const existingContact = this.contactList.find(contact => 
            contact.getID() === newContact.getID()
        );
        
        if (existingContact) {
            throw new Error("Contact with ID already exists");
        }
        
        this.contactList.push(newContact);
        this.saveToStorage();
    }

    deleteContact(contactID) {
        const index = this.contactList.findIndex(contact => 
            contact.getID() === contactID
        );
        
        if (index === -1) {
            throw new Error("Contact with ID not found");
        }
        
        this.contactList.splice(index, 1);
        this.saveToStorage();
    }

    updateContact(contactID, firstName, lastName, phone, address) {
        const contact = this.contactList.find(contact => 
            contact.getID() === contactID
        );
        
        if (!contact) {
            throw new Error("Contact with ID not found");
        }

        try {
            if (firstName !== null && firstName !== undefined) {
                contact.setFirstName(firstName);
            }
            if (lastName !== null && lastName !== undefined) {
                contact.setLastName(lastName);
            }
            if (phone !== null && phone !== undefined) {
                contact.setPhone(phone);
            }
            if (address !== null && address !== undefined) {
                contact.setAddress(address);
            }
            this.saveToStorage();
        } catch (error) {
            throw error;
        }
    }

    getContact(contactID) {
        const contact = this.contactList.find(contact => 
            contact.getID() === contactID
        );
        
        if (!contact) {
            throw new Error("Contact with ID not found");
        }
        
        return contact;
    }

    getAllContacts() {
        return [...this.contactList];
    }

    // Storage methods for persistence
    saveToStorage() {
        const data = this.contactList.map(contact => ({
            ID: contact.getID(),
            firstName: contact.getFirstName(),
            lastName: contact.getLastName(),
            phone: contact.getPhone(),
            address: contact.getAddress()
        }));
        localStorage.setItem('contacts', JSON.stringify(data));
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem('contacts');
            if (data) {
                const contacts = JSON.parse(data);
                this.contactList = contacts.map(contactData => 
                    new Contact(
                        contactData.ID,
                        contactData.firstName,
                        contactData.lastName,
                        contactData.phone,
                        contactData.address
                    )
                );
            }
        } catch (error) {
            console.error('Error loading contacts from storage:', error);
            this.contactList = [];
        }
    }
}
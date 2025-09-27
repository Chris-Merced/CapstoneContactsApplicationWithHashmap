import { Contact } from '../models/Contact.js';

//ContactService class - mirrors the Java implementation for managing contacts

export class ContactService {
    constructor() {
        this.contactList = [];
        this.contactHashMap = {}; // New hashmap
        this.loadFromStorage();
    }

    addContact(newContact) {
        // Check if contact with same ID already exists through hashmap instead of contactList
         if (this.contactHashMap[newContact.getID()]) {
            throw new Error("Contact with ID already exists");
        }
        this.contactList.push(newContact);
        this.contactHashMap[newContact.getID()] = newContact; // Add to hashmap
        this.saveToStorage();
    }

    deleteContact(contactID) {
        //Check existence through hashmap instead of contactList
        if (!this.contactHashMap[contactID]) {
            throw new Error("Contact with ID not found");
        }
        
        // Remove from array
        const index = this.contactList.findIndex(contact => 
            contact.getID() === contactID
        );
        this.contactList.splice(index, 1);
        
        // Remove from hashmap as well
        delete this.contactHashMap[contactID];
        this.saveToStorage();
    }

    // New method for O(1) search by ID
    searchContactByID(contactID) {
        return this.contactHashMap[contactID] || null;
    }

    updateContact(contactID, firstName, lastName, phone, address) {
        //Check existence via hashmap for O(1) lookup instead of O(n) with contact list
        const contact = this.contactHashMap[contactID]; 
        
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

    // New method for O(1) search by ID
    searchContactByID(contactID) {
        return this.contactHashMap[contactID] || null;
    }

    getContact(contactID) {
        //Get contact via hashmap for O(1) lookup now instead of O(n) with contact list
        const contact = this.contactHashMap[contactID]; 
        
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
                
                // Rebuild hashmap from loaded contacts
                this.contactHashMap = {};
                this.contactList.forEach(contact => {
                    this.contactHashMap[contact.getID()] = contact;
                });
            }
        } catch (error) {
            console.error('Error loading contacts from storage:', error);
            this.contactList = [];
            this.contactHashMap = {};
        }
    }
}
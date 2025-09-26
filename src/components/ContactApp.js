import { Contact } from '../models/Contact.js';
import { ContactService } from '../services/ContactService.js';

//ContactApp class - handles UI interactions and manages the contact application

export class ContactApp {
    constructor() {
        this.contactService = new ContactService();
        this.initializeEventListeners();
        this.renderContacts();
    }

    initializeEventListeners() {
        const form = document.getElementById('contactForm');
        form.addEventListener('submit', (e) => this.handleAddContact(e));
    }

    clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(el => el.textContent = '');
    }

    showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    showSuccess(message) {
        const successElement = document.getElementById('success-message');
        successElement.textContent = message;
        successElement.style.display = 'block';
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 3000);
    }

    handleAddContact(e) {
        e.preventDefault();
        this.clearErrors();

        const formData = new FormData(e.target);
        const contactData = {
            ID: formData.get('contactId').trim(),
            firstName: formData.get('firstName').trim(),
            lastName: formData.get('lastName').trim(),
            phone: formData.get('phone').trim(),
            address: formData.get('address').trim()
        };

        try {
            const contact = new Contact(
                contactData.ID,
                contactData.firstName,
                contactData.lastName,
                contactData.phone,
                contactData.address
            );

            this.contactService.addContact(contact);
            this.showSuccess('Contact added successfully!');
            e.target.reset();
            this.renderContacts();

        } catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID')) {
                this.showError('contactId', errorMessage);
            } else if (errorMessage.includes('firstName')) {
                this.showError('firstName', errorMessage);
            } else if (errorMessage.includes('lastName')) {
                this.showError('lastName', errorMessage);
            } else if (errorMessage.includes('phone')) {
                this.showError('phone', errorMessage);
            } else if (errorMessage.includes('address')) {
                this.showError('address', errorMessage);
            } else {
                this.showError('contactId', errorMessage);
            }
        }
    }

    handleDeleteContact(contactID) {
        if (confirm('Are you sure you want to delete this contact?')) {
            try {
                this.contactService.deleteContact(contactID);
                this.showSuccess('Contact deleted successfully!');
                this.renderContacts();
            } catch (error) {
                alert('Error deleting contact: ' + error.message);
            }
        }
    }

    handleEditContact(contactID) {
        const editForm = document.getElementById(`edit-${contactID}`);
        if (editForm.classList.contains('active')) {
            editForm.classList.remove('active');
            return;
        }

        // Hide all other edit forms
        document.querySelectorAll('.edit-form.active').forEach(form => {
            form.classList.remove('active');
        });

        editForm.classList.add('active');
    }

    handleUpdateContact(contactID) {
        const form = document.getElementById(`edit-form-${contactID}`);
        const formData = new FormData(form);
        
        const updates = {
            firstName: formData.get('firstName').trim(),
            lastName: formData.get('lastName').trim(),
            phone: formData.get('phone').trim(),
            address: formData.get('address').trim()
        };

        try {
            this.contactService.updateContact(
                contactID,
                updates.firstName || null,
                updates.lastName || null,
                updates.phone || null,
                updates.address || null
            );
            
            this.showSuccess('Contact updated successfully!');
            document.getElementById(`edit-${contactID}`).classList.remove('active');
            this.renderContacts();
        } catch (error) {
            alert('Error updating contact: ' + error.message);
        }
    }

    renderContacts() {
        const contactsList = document.getElementById('contactsList');
        const contacts = this.contactService.getAllContacts();

        if (contacts.length === 0) {
            contactsList.innerHTML = `
                <div class="empty-state">
                    No contacts yet. Add your first contact above!
                </div>
            `;
            return;
        }

        contactsList.innerHTML = contacts.map(contact => `
            <div class="contact-item">
                <div class="contact-info">
                    <div class="contact-name">${contact.getFirstName()} ${contact.getLastName()}</div>
                    <div class="contact-details">
                        ID: ${contact.getID()} | Phone: ${contact.getPhone()} | Address: ${contact.getAddress()}
                    </div>
                </div>
                <div class="contact-actions">
                    <button class="btn-small btn-secondary" onclick="app.handleEditContact('${contact.getID()}')">
                        Edit
                    </button>
                    <button class="btn-small btn-danger" onclick="app.handleDeleteContact('${contact.getID()}')">
                        Delete
                    </button>
                </div>
                <div class="edit-form" id="edit-${contact.getID()}">
                    <form id="edit-form-${contact.getID()}" onsubmit="event.preventDefault(); app.handleUpdateContact('${contact.getID()}')">
                        <div class="form-row">
                            <div class="form-group">
                                <label>First Name</label>
                                <input type="text" name="firstName" value="${contact.getFirstName()}" required>
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" value="${contact.getLastName()}" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text" name="phone" value="${contact.getPhone()}" required>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" name="address" value="${contact.getAddress()}" required>
                            </div>
                        </div>
                        <button type="submit">Update Contact</button>
                        <button type="button" class="btn-secondary" onclick="document.getElementById('edit-${contact.getID()}').classList.remove('active')">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        `).join('');
    }
}
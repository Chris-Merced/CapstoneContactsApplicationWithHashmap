//Contact class - mirrors the Java implementation with validation

export class Contact {
    constructor(ID, firstName, lastName, phone, address) {
        // Validation matching Java implementation
        if (!ID || ID.length > 10) {
            throw new Error("Invalid ID");
        }
        if (!firstName || firstName.length > 10) {
            throw new Error("Invalid firstName");
        }
        if (!lastName || lastName.length > 10) {
            throw new Error("Invalid lastName");
        }
        if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
            throw new Error("Invalid phone");
        }
        if (!address || address.length > 30) {
            throw new Error("Invalid address");
        }

        this.ID = ID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
    }

    // Getters
    getID() { 
        return this.ID; 
    }
    
    getFirstName() { 
        return this.firstName; 
    }
    
    getLastName() { 
        return this.lastName; 
    }
    
    getPhone() { 
        return this.phone; 
    }
    
    getAddress() { 
        return this.address; 
    }

    // Setters with validation
    setFirstName(firstName) {
        if (!firstName || firstName.length > 10) {
            throw new Error("Invalid firstName");
        }
        this.firstName = firstName;
    }

    setLastName(lastName) {
        if (!lastName || lastName.length > 10) {
            throw new Error("Invalid lastName");
        }
        this.lastName = lastName;
    }

    setPhone(phone) {
        if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
            throw new Error("Invalid phone");
        }
        this.phone = phone;
    }

    setAddress(address) {
        if (!address || address.length > 30) {
            throw new Error("Invalid address");
        }
        this.address = address;
    }

    toString() {
        return `ID: ${this.ID}, Name: ${this.firstName} ${this.lastName}, Phone: ${this.phone}, Address: ${this.address}`;
    }
}
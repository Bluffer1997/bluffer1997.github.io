// Person Constructor
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.greeting = function() {
    return `Hello there, ${this.firstName} ${this.lastName}.`
}

const Person1 = new Person('John', 'Doe');

// console.log(Person1.greeting());


// Customer Constructor

function Customer(firstName, lastName, phone, membership) {
    Person.call(this, firstName, lastName); //Call (run) function from another area
    this.phone = phone;
    this.membership = membership;
}

// Inherit the Person prototype methods
Customer.prototype = Object.create(Person.prototype)

// Make customer.prototype return Customer() 
Customer.prototype.constructor = Customer;


// Create Customer
const customer1 = new Customer('Tom', 'Smith', '555-555-5555', 'Standard');

console.log(customer1)

// Customer Greeting
Customer.prototype.greeting = function() {
    return `Hello there, ${this.firstName} ${this.lastName}. Welcome to our company.`
}

console.log(customer1.greeting());
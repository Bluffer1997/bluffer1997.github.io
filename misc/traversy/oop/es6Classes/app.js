class Person {
    constructor(firstName, lastName, dob) {  
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = new Date(dob);
    }

    greeting() {
        return `Hello there, ${this.firstName} ${this.lastName}.`;
    }

    calculateAge() {
        const diff = Date.now() - this.birthday.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    getsMarried(newLastName) {
        this.lastName = newLastName;
    }

    static addNumbers(x,y) {
        return x + y;
    }
}

const mary = new Person('Mary', 'Williams', '11-13-1980');

// console.log(mary);

// console.log(mary.greeting())

// console.log(mary.calculateAge());

// mary.getsMarried('Thomas');

// console.log(mary);

// console.log(mary.addNumbers(2,2)); WONT WORK

console.log(Person.addNumbers(2,3)); // This works
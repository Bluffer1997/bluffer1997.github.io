// Object.create
// create prototypes inside a parent object then have different properties with different prototype functions/methods. 

const personPrototypes = {
    greeting: function() {
        return `Hello there, ${this.firstName} ${this.lastName}.`
    },
    getsMarried: function(newLastName) {
        this.lastName = newLastName;
    }
}

const mary = Object.create(personPrototypes);
// Add properties to "mary" object
mary.firstName = 'Mary';
mary.lastName = 'Williams';
mary.age = 30;
console.log(mary.greeting());

mary.getsMarried('Thompson');
console.log(mary.greeting());


const brad = Object.create(personPrototypes, {
    firstName: { value: 'Brad'},
    lastName: { value: 'Traversy'},
    age: { value: 36}
});

console.log(brad);
console.log(brad.greeting())

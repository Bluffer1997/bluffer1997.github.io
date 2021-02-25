// Each object has a prototype
// Each prototype is a object
// All objects inherit their properties and methods 
// Object Literals inherit from object.prototype
// When dealing with objects created through a constructor it will inherit from object.prototype (Person.prototype)


// Person constructor 
function Person(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(dob);    
}
Person.prototype.calculateAge =  function() {
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970)        
}    

Person.prototype.getFullName = function() {
   return `${this.firstName} ${this.lastName}`; 
}

// Gets Married
Person.prototype.getsMarried = function(newLastName) {
    this.lastName = newLastName;
}

const jeff = new Person('Jeff', 'Ridway', 'March 8 1967');
const mary = new Person('Mary', 'Johnston', '9-15-1991')

console.log(jeff.calculateAge());

console.log(mary.getFullName());

mary.getsMarried('Smith')

console.log(mary.getFullName());

console.log(mary.hasOwnProperty('getFullName'));
console.log(mary.hasOwnProperty('firstName'));
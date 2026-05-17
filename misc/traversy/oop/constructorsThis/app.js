// Object Literals (Refresher)
// One object/instance 
/*
const John = {
    firstName : 'John',
    lastName : 'Smith',
    age : 38,
    city : 'Boston'
};
console.log(new Date().getFullYear() - John.age);
*/



// Constructor Method
    // Person Constructor
function Person(name, dob) {
    // object scope
    // console.log(this);

    this.name = name;
    this.birthday = new Date(dob);
    this.calculateAge = function() {
        const diff = Date.now() - this.birthday.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

}

// instantiate the object / create instance of the object
const brad = new Person('Brad', '9-10-1981');
// console.log(brad.calculateAge());
console.log(brad);
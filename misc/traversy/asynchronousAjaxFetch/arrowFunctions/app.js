/*const sayHello = function() {
    console.log('Hello')
}*/

/*const sayHello = () => {
    console.log('Hello');
}*/

// Single line 
// const sayHello = () => console.log('Hello');

// Single Line Return 
// const sayHello = () => 'Hello'; 

// Same as above
/*const sayHello = function() {
    return 'Hello';
}
console.log(sayHello());
*/

// Return object literal - Must wrap object literal in () otherwise it think
/*
const sayHello = () => ({msg: 'Hello, world'});
console.log(sayHello());
*/

// const sayHello = (name) => console.log(`Hello there, ${name}`); 
// Single parameter does not need parenthesis
/*
const sayHello = name => console.log(`Hello there, ${name}`);
sayHello('Dayton')
*/

// const sayHello = firstName, lastName => console.log(`Hello, ${firstName}, ${lastName}`);
// Multiple parameters need parenthesis
/* 
const sayHello = (firstName, lastName) => console.log(`Hello, ${firstName}, ${lastName}`);

sayHello('Wayne', 'Gretzky');
*/

const users = ['Nathan', 'John', 'William'];

/*
const nameLengths = users.map(function(name) {
    return name.length;
});
*/

// Shorter
/*
const nameLengths = users.map((name) => {
    return name.length;
});
*/

// Shortest
const nameLengths = users.map(name => name.length);
console.log(nameLengths);
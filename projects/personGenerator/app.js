/* 
    What are we trying to accomplish? 
        - Array of first names, array of last names, array of ages (or just random between x and y numbers), array of cities. 
        - Build a UI that is essentially a profile card page? It randomly choses a first name, last name, age, and city. 
*/

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const age = document.querySelector('#age');
const city = document.querySelector('#city');
const generate = document.querySelector('#generate');




generate.addEventListener('click', (e) => {
    e.preventDefault
    randAge();
    randMaleFirstName();
    randLastName();
    randCity();
});

const randAge = () => {
    age.textContent = Math.floor(Math.random() * (50-18) + 18) + ' years old';
    //     return Math.random() * (max - min) + min;
}

const randMaleFirstName = () => {
    const maleFirstNames = ['Alex', 'Adrian', 'Allen', 'Brandon', 'Brenden', 'Bryce', 'Charlie', 'Charles', 'Chuck', 
    'Christopher', 'Dylan', 'David', 'Daniel', 'Evan', 'Ethan', 'Frank', 'Filip', 'Greg', 'George', 'Hal', 'Isaac', 
    'Jesse', 'Kyle', 'Lorenzo', 'Matthew', 'Nicholas', 'Phil', 'Ryan','Steve', 'Thomas', 'Victor', 'Zack'];
    
    firstName.textContent = maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
}

const randLastName = () => {
    const lastNames = ['Anderson', 'Alexander', 'Calahan', 'Davis', 'Jensen', 'Schmidt', 'Johnston', 'Russell', 'Hinton', 'Moore',
    'Schwartz', 'Meyers', 'Daniels', 'Wells', 'Pratt', 'Morgan', 'McDonald', 'Coleman', 'Cameron', 'Kelly', 'Roth', 'Simpson',
    'Kent', 'Lucas', 'Hammond', 'Decker', 'Sanchez', 'Willis', 'Jefferson', 'Wilson', 'Beasley', 'Scott', 'Stokes', 'Peterson'];

    lastName.textContent = lastNames[Math.floor(Math.random() * lastNames.length)];
}

const randCity = () => {
    const cities = ['Arlington, TX', 'Austin, TX', 'Boston, MA', 'Baltimore, MD', 'Dallas, TX', 'Denver, CO', 'Detroit, MI', 'Indianapolis, IN', 
    'Charleston, SC', 'Nashville, TN', 'Portland, OR', 'Los Angeles, CA', 'New York, NY', 'Las Vegas, NV', 'New Orleans, LA', 'Phoenix, AZ',
    'Atlanta, GA', 'Miami, FL', 'Minneapolis, MN', 'Milwaukee, WI', 'Columbus, OH', 'Philadelphia, PA', 'Seattle, WA', 'Washington, DC'
];

    city.textContent = cities[Math.floor(Math.random() * cities.length)];
}
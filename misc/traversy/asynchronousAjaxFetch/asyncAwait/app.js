/* async function myFunc() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Some message'), 1000);
    });

    const error = false; 
    if (!error) {
        const res = await promise; // Wait until Promise resolved.
        return res;
    } else {
        await Promise.reject(new Error('Something happened.') )
    }

}

myFunc()
    .then(res => console.log(res))
    .catch(err => console.log(err));
*/

async function getUsers() {
    // Await response of the fetch call.
    const response = await fetch('http://jsonplaceholder.typicode.com/users');   
    // Only proceed once promise resolved
    const data = await response.json();
    // Only proceed once second promise resolved
    return data;
}

getUsers()
    .then(users => console.log(users));
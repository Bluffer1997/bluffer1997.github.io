document.getElementById('button1').addEventListener('click', getText);
document.getElementById('button2').addEventListener('click', getJson);
document.getElementById('button3').addEventListener('click', getExternal);

// Get Local Text File Data
function getText() {
    fetch('test.txt')
    .then(function(res) {
        return res.text();
    })
    .then(function(data) {
        document.getElementById('output').innerHTML = data;
    })
    .catch(function(err) {
        console.log(err);
    });
}

// Get Local Json Data
function getJson() {
    fetch('posts.json')
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        let output = '';
        data.forEach(function(post) {
            output += `<li>${post.title}</li>`
        });
        document.getElementById('output').innerHTML = output;
    })
    .catch(function(err) {
        console.log(err);
    });
}

// Get External API Data
function getExternal() {
    fetch('https://api.github.com/users')
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        let output = '';
        console.log(data)
        data.forEach(function(user) {
            output += `<li>${user.login}</li>`
        });
        document.getElementById('output').innerHTML = output;
    })
    .catch(function(err) {
        console.log(err);
    });
}
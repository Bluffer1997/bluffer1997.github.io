const posts = [
    {title: 'Post One', body: 'This is post one body'},
    {title: 'Post Two', body: 'This is post two body'}
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPosts(post, callback) {
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);
}

createPosts(
    {title: 'Post Three', body: 'This is post three body.'}, getPosts);
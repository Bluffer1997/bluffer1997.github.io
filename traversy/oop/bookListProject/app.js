// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor

function UI() {}
// Add Book To List
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    // Create TR element
    const row = document.createElement('tr');
    // Insert Cols
    row.innerHTML = 
    `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className) {
    // Create DIV
    const div = document.createElement('div');
    // Add Classes
    div.className = `alert ${className}`;
    // Add Text Node
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.getElementById('book-form');
    // Insert Alert
    container.insertBefore(div, form);
    // Timeout after 3 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}


// Clear Fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

// Event Listener For Add Book
document.getElementById('book-form').addEventListener('submit', (e) => {
    const title = document.getElementById('title').value, 
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn); 
  
    // Instantiate UI
    const ui = new UI();

    console.log(ui)
    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error Alert
        ui.showAlert('Please fill in all fields.', 'error');
    } else {
        // Add Book To List
        ui.addBookToList(book);

        // Show success alert
        ui.showAlert('Book Added!', 'success');
        // Clear Fields
        ui.clearFields() 
    }

    e.preventDefault();

});


// Event Listener for Delete

document.getElementById('book-list').addEventListener('click', (e) => {
    // Instantiate UI
    const ui = new UI();

    // Delete Book
    ui.deleteBook(e.target);

    // Show Message 
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});
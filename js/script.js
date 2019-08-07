"use strict";

// Book class
class Book {
  constructor(title, author, pagesNumber, isbn, isRead = false) {
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.isbn = isbn;
    this.isRead = isRead;
  }
}


// UI class
class UI {

  static displayBooks() {
    const localStorageBooks = Storage.getBooks();

    const userBooks = localStorageBooks;

    userBooks.forEach((book) => UI.addBookItem(book));
  }

  static addBookItem(book) {
    const booksCollectionContainer = document.querySelector(".books-collection");
    const bookItemContainer = document.createElement("article");
    bookItemContainer.className = "book-item-container"

    bookItemContainer.innerHTML = `
      <atricle>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <p class="book-isbn">${book.isbn}</p>
        <div class="book-item-buttons">
          <a href="#" class="mark-read-button">
            <i class="fa fa-${UI.bookStatusIcon(book)}"></i>
          </a>
          <a href="#" class="delete-button">
            <i class="fa fa-trash"></i>
          </a>
        </div>
      </atricle>
    `;

    booksCollectionContainer.appendChild(bookItemContainer);
  }

  static deleteBookItem(bookDeleteIcon, bookISBN) {
    if (bookDeleteIcon.parentElement.classList.contains("delete-button")) {
      bookDeleteIcon.closest(".book-item-container").remove();
      UI.showMessage("Book removed!", "success");

      Storage.removeBook(bookISBN);
    }
  }

  static toogleBookStatusIcon(statusIcon, bookISBN) {
    if (statusIcon.parentElement.classList.contains("mark-read-button")) {
      Storage.changeBookReadStatus(bookISBN);

      const bookLibrary = Storage.getBooks();
      const book = bookLibrary.find(book => book.isbn === bookISBN);
      statusIcon.parentElement.innerHTML = `<i class='fa fa-${UI.bookStatusIcon(book)}'></i>`;
    }
  }

  static clearFields(){
    document.querySelector("#title-field").value = "";
    document.querySelector("#author-field").value = "";
    document.querySelector("#pages-field").value = "";
    document.querySelector("#isbn-field").value = "";
  }

  static showMessage(message, messageType) {
    const messageDiv = document.createElement("div");
    const mainDiv = document.querySelector("main");

    messageDiv.className = `alert alert-${messageType}`;
    messageDiv.innerHTML = message;

    mainDiv.insertBefore(messageDiv, mainDiv.firstChild);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static bookStatusIcon(book){
    if (book.isRead) {
      return "times";
    } else {
      return "check";
    }
  }

}

// Storage class
class Storage {
  static getBooks() {
    let bookLibrary;

    if (localStorage.books == undefined) {
      bookLibrary = [];
    } else {
      bookLibrary = JSON.parse(localStorage.books);
    }

    return bookLibrary;
  }

  static addBook(book) {
    let bookLibrary = Storage.getBooks();
    bookLibrary.push(book);
    localStorage.books = JSON.stringify(bookLibrary);
  }

  static removeBook(bookISBN) {
    let bookLibrary = Storage.getBooks();
    bookLibrary.forEach((book, index) => {
      if (book.isbn == bookISBN) {
        bookLibrary.splice(index, 1);
      }
    });

    localStorage.books = JSON.stringify(bookLibrary);
  }

  static changeBookReadStatus(bookISBN) {
    let bookLibrary = Storage.getBooks();
    bookLibrary.forEach((book, index) => {
      if (book.isbn == bookISBN) {
        bookLibrary[index].isRead = !bookLibrary[index].isRead;
      }
    });

    localStorage.books = JSON.stringify(bookLibrary);
  }

}

// Events

// 1.display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// 2.add a book
document.querySelector("#add-book-form").addEventListener('submit', (addBookEvent) => {
  // prevent default action
  addBookEvent.preventDefault();

  // Get form values
  const title = document.querySelector("#title-field").value;
  const author = document.querySelector("#author-field").value;
  const pagesNumber = document.querySelector("#pages-field").value;
  const isbn = document.querySelector("#isbn-field").value;

  if (title === "" || author === "" || pagesNumber === "" || isbn == "") {
    UI.showMessage("Please fill all the fields", "danger");
  }
  else {
    const newBook = new Book(title, author, pagesNumber, isbn);
    UI.addBookItem(newBook);
    Storage.addBook(newBook);
    UI.showMessage("Book added!", "success");
    UI.clearFields();
  }

});

// 3.remove a book or toggle book status
document.querySelector(".books-collection").addEventListener('click', (clickedSection) => {
  const bookISBN = clickedSection.target.parentElement.parentElement.parentElement.childNodes[5].textContent;
  UI.deleteBookItem(clickedSection.target, bookISBN);
  UI.toogleBookStatusIcon(clickedSection.target, bookISBN);
});


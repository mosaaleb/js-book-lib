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

  // Toogle read status
}


// UI class
class UI {

  static displayBooks() {
    // Just imitate the books coming from local storage for now
    const localStorageBooks = [
      {title: "title1", author: "author1", pagesNumber: 100, isbn: "978-1-9028-2271-6"},
      {title: "title1", author: "author1", pagesNumber: 100, isbn: "978-1-5888-1583-5"},
      {title: "title1", author: "author1", pagesNumber: 100, isbn: "978-8-6901-7329-7"}
    ];

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
            <i class="fa fa-check"></i>
          </a>
          <a href="#" class="delete-button">
            <i class="fa fa-trash"></i>
          </a>
        </div>
      </atricle>
    `;

    booksCollectionContainer.appendChild(bookItemContainer);
  }

  static deleteBookItem(bookDeleteIcon) {
    // TODO: rafactor parent element multiple times
    if (bookDeleteIcon.parentElement.classList.contains("delete-button")) {
      //bookDeleteIcon.parentElement.parentElement.parentElement.parentElement.remove();
      bookDeleteIcon.closest(".book-item-container").remove();
    }
  }

  static clearFields(){
    document.querySelector("#title-field").value = "";
    document.querySelector("#author-field").value = "";
    document.querySelector("#pages-field").value = "";
    document.querySelector("#isbn-field").value = "";
  }
}

// Storage class
class Storage {

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

  const newBook = new Book(title, author, pagesNumber, isbn);

  UI.addBookItem(newBook);
  UI.clearFields();
});

// 3.remove a book
document.querySelector(".books-collection").addEventListener('click', (clickedSection) => {
  //UI.deleteBook(clickedSection.target);
  UI.deleteBookItem(clickedSection.target);
});

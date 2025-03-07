const VALID_READ_STATUSES = ["Not read", "Currently Reading", "Read"];

const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pages, readStatus, library) {
  const newBook = new Book(title, author, pages, readStatus);
  library.push(newBook);
}

function generateID() {
  return crypto.randomUUID();
}

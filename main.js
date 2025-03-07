const VALID_STATUSES = ["Not read", "Currently Reading", "Read"];

const myLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkien", 310, "Not read"),
  new Book("1984", "George Orwell", 328, "read"),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, "Currently Reading"),
];

function generateID() {
  return crypto.randomUUID();
}

function Book(title, author, pages, readStatus) {
  this.id = generateID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = readStatus;
}

function addBookToLibrary(title, author, pages, status, library) {
  const newBook = new Book(title, author, pages, status);
  library.push(newBook);
}

function generateID() {
  return crypto.randomUUID();
}

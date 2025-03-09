const VALID_STATUSES = ["Not read", "Currently Reading", "Read"];

const myLibrary = [];

function generateID() {
  return crypto.randomUUID();
}

function Book(title, author, year, pages, readStatus) {
  this.id = generateID();
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.status = readStatus;
}

function addBookToLibrary(bookData, library) {
  const newBook = new Book(
    bookData.title,
    bookData.author,
    bookData.year,
    bookData.pages,
    bookData.status
  );
  library.push(newBook);
}

function addStatusColor(statusCell, status) {
  if (status === "Not read") {
    statusCell.classList.add("not-read");
  } else if (status === "Read") {
    statusCell.classList.add("read");
  } else {
    statusCell.classList.add("currently-reading");
  }
}

function displayLibrary(library) {
  /*
  loop through library
  for each book:
    create a new table row
    create 4 td elements with the book info
    set the colour of the status depending on what it is
      green for read, amber for currently reading, red for not read
  */

  const tableRef = document.querySelector(".library-table");

  for (let book of library) {
    const newRow = tableRef.insertRow();

    let newCell;

    // Add book data
    newCell = newRow.insertCell();
    newCell.textContent = book.title;

    newCell = newRow.insertCell();
    newCell.textContent = book.author;

    newCell = newRow.insertCell();
    newCell.textContent = book.year;

    newCell = newRow.insertCell();
    newCell.textContent = book.pages;

    newCell = newRow.insertCell();
    newCell.textContent = book.status;
    addStatusColor(newCell, book.status);
  }
}

function setupAddBookButton() {
  const button = document.querySelector(".add-book");
  const dialog = document.querySelector(".add-book-dialog");

  button.addEventListener("click", () => {
    dialog.showModal();
  });
}

addBookToLibrary(
  "The Hobbit",
  "J.R.R. Tolkien",
  1937,
  310,
  "Not read",
  myLibrary
);
addBookToLibrary("1984", "George Orwell", 1949, 328, "Read", myLibrary);
addBookToLibrary(
  "To Kill a Mockingbird",
  "Harper Lee",
  1960,
  281,
  "Currently Reading",
  myLibrary
);

displayLibrary(myLibrary);

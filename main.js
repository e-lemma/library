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
  library.push(
    new Book(
      bookData.title,
      bookData.author,
      bookData.year,
      bookData.pages,
      bookData.status
    )
  );
}

function addStatusColor(statusCell, status) {
  if (status === "Not Read") {
    statusCell.classList.add("not-read");
  } else if (status === "Read") {
    statusCell.classList.add("read");
  } else {
    statusCell.classList.add("currently-reading");
  }
}

function clearTable() {
  const tbody = document.querySelector("table tbody");
  if (tbody) {
    tbody.innerHTML = "";
    console.log("cleared table");
  }
}

function displayLibrary(library) {
  const tableRef = document.querySelector("table tbody");

  clearTable();

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

function setupFormButtons() {
  const cancelButton = document.querySelector(".cancel-button");
  const dialog = document.querySelector(".add-book-dialog");
  const form = document.querySelector(".new-book-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const bookData = {};
    for (let [key, value] of formData.entries()) {
      bookData[key] = value;
    }

    addBookToLibrary(bookData, myLibrary);

    dialog.close();

    displayLibrary(myLibrary);

    form.reset();
  });

  cancelButton.addEventListener("click", () => {
    dialog.close();
    form.reset();
  });
}

setupAddBookButton();
setupFormButtons();

// Sample books
const sampleBooks = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    pages: 281,
    status: "Read",
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    pages: 328,
    status: "Currently Reading",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    pages: 180,
    status: "Not Read",
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    year: 1851,
    pages: 635,
    status: "Not Read",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    pages: 432,
    status: "Read",
  },
];

// Add sample books to library
sampleBooks.forEach((book) => addBookToLibrary(book, myLibrary));
displayLibrary(myLibrary);

let myLibrary = [];

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

Book.prototype.toggleStatus = function () {
  const statusMapping = {
    "Not Read": "Currently Reading",
    "Currently Reading": "Read",
    Read: "Not Read",
  };

  this.status = statusMapping[this.status];
};

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

function removeBookFromLibrary(bookId) {
  myLibrary = myLibrary.filter((book) => book.id !== bookId);
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
  }
}

function displayLibrary(library) {
  const tableRef = document.querySelector("table tbody");

  clearTable();

  for (let book of library) {
    displayBook(book, tableRef);
  }
}

function displayBook(bookData, tableElement) {
  const row = tableElement.insertRow();
  let cell;

  cell = row.insertCell();
  cell.textContent = bookData.title;

  cell = row.insertCell();
  cell.textContent = bookData.author;

  cell = row.insertCell();
  cell.textContent = bookData.year;

  cell = row.insertCell();
  cell.textContent = bookData.pages;

  cell = row.insertCell();
  cell.textContent = bookData.status;
  addStatusColor(cell, bookData.status);

  addStatusToggleButton(cell, bookData.id);
  addRemoveButton(row, bookData.id);
}

function addRemoveButton(rowElement, bookId) {
  const removeButton = document.createElement("button");
  removeButton.textContent = "×";
  removeButton.classList.add("remove-button");
  removeButton.dataset.bookId = bookId;
  setupRemoveButton(removeButton);
  rowElement.appendChild(removeButton);
}

function setupRemoveButton(button) {
  button.addEventListener("click", () => {
    removeBookFromLibrary(button.dataset.bookId);
    displayLibrary(myLibrary);
  });
}

function addStatusToggleButton(statusCellElement, bookId) {
  const toggleButton = document.createElement("button");
  toggleButton.classList.add("status-toggle-button");
  toggleButton.dataset.bookId = bookId;
  setupStatusToggleButton(toggleButton);
  statusCellElement.appendChild(toggleButton);
}

function setupStatusToggleButton(button) {
  button.addEventListener("click", () => {
    for (let book of myLibrary) {
      if (book.id === button.dataset.bookId) {
        book.toggleStatus();
        displayLibrary(myLibrary);
      }
    }
  });
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
    title: "The Sound and the Fury",
    author: "William Faulkner",
    year: 1929,
    pages: 326,
    status: "Read",
  },
  {
    title: "The Plague",
    author: "Albert Camus",
    year: 1947,
    pages: 308,
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
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    pages: 277,
    status: "Not Read",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    year: 180,
    pages: 256,
    status: "Read",
  },
];

// Add sample books to library
sampleBooks.forEach((book) => addBookToLibrary(book, myLibrary));
displayLibrary(myLibrary);

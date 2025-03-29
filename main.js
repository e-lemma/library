class Library {
  #books;

  constructor() {
    this.#books = [];
  }

  addBook(book) {
    this.#books.push(book);
  }

  removeBook(bookId) {
    this.#books = this.#books.filter((book) => book.id !== bookId);
  }

  getBooks() {
    return this.#books;
  }
}

class Book {
  #validStatuses = ["Not Read", "Currently Reading", "Read"];

  constructor(title, author, year, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.status = status;
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    if (!this.#validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }
    this._status = newStatus;
  }

  toggleStatus() {
    const statusMapping = {
      "Not Read": "Currently Reading",
      "Currently Reading": "Read",
      Read: "Not Read",
    };

    this.status = statusMapping[this._status];
  }
}

class Table {
  constructor(library) {
    this.element = document.querySelector("table tbody");
    this.library = library;
  }

  addRow(book) {
    const row = new Row(this.element, library, this);

    row.addCell(book.title);
    row.addCell(book.author);
    row.addCell(book.year);
    row.addCell(book.pages);
    const statusCell = row.addCell(book.status);
    row.addStatusColor(statusCell);

    row.addStatusToggleButton(statusCell, book.id);
    row.addRemoveButton(book.id);
  }

  #clearTable() {
    if (this.element) {
      this.element.innerHTML = "";
    } else {
      alert("Table body not found");
    }
  }

  displayLibrary(library) {
    this.#clearTable();

    for (let book of library.getBooks()) {
      this.addRow(book);
    }
  }
}

class Row {
  constructor(tableElement, library, table) {
    this.library = library;
    this.table = table;
    this.cells = [];
    this.element = tableElement.insertRow();
  }

  addCell(content) {
    const cell = this.element.insertCell();
    cell.textContent = content;
    this.cells.push(cell);
    return cell;
  }

  addStatusColor(statusCell) {
    if (statusCell.textContent === "Not Read") {
      statusCell.classList.add("not-read");
    } else if (statusCell.textContent === "Read") {
      statusCell.classList.add("read");
    } else {
      statusCell.classList.add("currently-reading");
    }
  }

  addRemoveButton(bookId) {
    const removeButton = document.createElement("button");
    removeButton.textContent = "×";
    removeButton.classList.add("remove-button");
    removeButton.dataset.bookId = bookId;
    removeButton.addEventListener("click", () => {
      this.library.removeBook(removeButton.dataset.bookId);
      this.table.displayLibrary(this.library);
    });
    this.element.appendChild(removeButton);
  }

  addStatusToggleButton(statusCell, bookId) {
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("status-toggle-button");
    toggleButton.dataset.bookId = bookId;
    toggleButton.addEventListener("click", () => {
      const book = this.library.getBooks().find((book) => book.id === bookId);
      if (book) {
        book.toggleStatus();
        this.table.displayLibrary(this.library);
      }
    });
    statusCell.appendChild(toggleButton);
  }
}

class Form {
  constructor() {
    this.element = document.querySelector(".new-book-form");
  }

  setupAddBookButton() {
    const button = document.querySelector(".add-book");
    const dialog = document.querySelector(".add-book-dialog");

    button.addEventListener("click", () => {
      dialog.showModal();
    });
  }

  setupFormButtons() {
    const cancelButton = document.querySelector(".cancel-button");
    const dialog = document.querySelector(".add-book-dialog");

    this.element.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(this.element);
      const bookData = {};
      for (let [key, value] of formData.entries()) {
        bookData[key] = value;
      }
      const newBook = new Book(
        bookData.title,
        bookData.author,
        bookData.year,
        bookData.pages,
        bookData.status
      );

      library.addBook(newBook);
      table.addRow(newBook);

      dialog.close();

      table.displayLibrary(library);

      this.element.reset();
    });

    cancelButton.addEventListener("click", () => {
      dialog.close();
      this.element.reset();
    });
  }
}

const library = new Library();
const form = new Form();
const table = new Table(library);

form.setupAddBookButton();
form.setupFormButtons();

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
sampleBooks.forEach((book) =>
  library.addBook(
    new Book(book.title, book.author, book.year, book.pages, book.status)
  )
);
table.displayLibrary(library);

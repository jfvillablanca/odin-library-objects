const myLibrary = [];

class Book {
  constructor(title, author, published, haveRead) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.haveRead = haveRead;
  }

  static insertNewBook(title, author, published, haveRead, libraryIndex) {
    // return newBook(this.title, this.author, this.published, this.haveRead);
    const book = document.createElement("div");
    book.classList.add("book");
    book.setAttribute("data-index", libraryIndex);

    const bookTitleH1 = document.createElement("h1");
    bookTitleH1.classList.add("book-title");
    bookTitleH1.textContent = title;

    const bookAttrib = document.createElement("ul");

    const bookAuthor = document.createElement("li");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = `Author: ${author}`;

    const bookPublished = document.createElement("li");
    bookPublished.classList.add("book-published");
    bookPublished.textContent = `Published: ${published}`;

    const bookRead = document.createElement("li");
    bookRead.classList.add("book-have-read");
    haveRead
      ? (bookRead.textContent = "I have read this book already.")
      : (bookRead.textContent = "I have NOT read this book yet.");

    const removeBook = document.createElement("button");
    removeBook.textContent = "Remove Book";
    removeBook.setAttribute("data-index", libraryIndex);

    bookAttrib.appendChild(bookAuthor);
    bookAttrib.appendChild(bookPublished);
    bookAttrib.appendChild(bookRead);

    book.appendChild(bookTitleH1);
    book.appendChild(bookAttrib);
    book.appendChild(removeBook);

    return book;
  }

  static deleteBookFromLibrary(library, libraryIndex) {
    library.splice(libraryIndex, 1);
    console.log(library);
    return;
  }
}

// Filler Data

myLibrary.push(new Book("Republic", "Plato", "375 BC", false));
myLibrary.push(new Book("A Discipline of Programming", "Edsger W. Dijkstra", "1976", true));
myLibrary.push(new Book("Das Kapital, Volume I", "Karl Marx", "1867", false));

// DOM Stuff

const bookList = document.querySelector(".book-list");
const addABookButton = document.querySelector(".add-button > button");
const addBookPopupWindow = document.querySelector(".add-book-popup");

addABookButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBookPopupWindow.classList.toggle("visible");
  if (addBookPopupWindow.classList.contains("visible")) {
    addABookButton.classList.add("popup-active");
    addABookButton.textContent = "Close window";
  }
  else {
    addABookButton.classList.remove("popup-active");
    addABookButton.textContent = "Add a book";
  }
});

for (const i in myLibrary) {
  bookList.appendChild(
    Book.insertNewBook(
      myLibrary[i].title,
      myLibrary[i].author,
      myLibrary[i].published,
      myLibrary[i].haveRead,
      i,
    )
  );
}

const removeBookButtons = document.querySelectorAll(".book > button");

removeBookButtons.forEach((removeBookButton) => {
  removeBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    const dataIndex = +e.target.attributes[0].value; 
    console.log(dataIndex);

    const bookToBeRemovedFromDOM = document.querySelector(`[data-index="${dataIndex}"]`);
    bookList.removeChild(bookToBeRemovedFromDOM);                   // Removes book card from DOM
    Book.deleteBookFromLibrary(myLibrary, dataIndex);               // Removes book object from Array
  })
})

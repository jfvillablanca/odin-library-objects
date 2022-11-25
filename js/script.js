const myLibrary = [];

class Book {
  constructor(title, author, published, haveRead) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.haveRead = haveRead;
  }

  static insertNewBookToDOM(title, author, published, haveRead, libraryIndex) {
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

  static deleteBookFromLibrary(libraryArray, libraryDOM, libraryIndex) {
    libraryArray.splice(libraryIndex, 1);
    refreshDOMBookList(libraryArray, libraryDOM);
    addEventListenersToRemoveBookButtons();
    return;
  }
}

// Filler Data
myLibrary.push(new Book("Republic", "Plato", "375 BC", false));
myLibrary.push(new Book("A Discipline of Programming", "Edsger W. Dijkstra", "1976", true));
myLibrary.push(new Book("Das Kapital, Volume I", "Karl Marx", "1867", false));

// DOM Generation
const bookList = document.querySelector(".book-list");
const addABookButton = document.querySelector(".add-button > button");
const addBookPopupWindow = document.querySelector(".add-book-popup");
let buttonsRemoveBook = document.querySelectorAll(".book > button");

// Add a new Book
const addEventListenersToAddBookButton = function() {
  addABookButton.addEventListener("click", (e) => {
    e.preventDefault();
    addBookPopupWindow.classList.toggle("visible");
    if (addBookPopupWindow.classList.contains("visible")) {
      addABookButton.classList.add("popup-active");
      addABookButton.textContent = "Close window";
      insertNewBookToArrayAndDOM(myLibrary, bookList);
    }
    else {
      addABookButton.classList.remove("popup-active");
      addABookButton.textContent = "Add a book";
    }
  });
}

// Insert new Book to library and DOM
const insertNewBookToArrayAndDOM = function(libraryArray, libraryDOM) {
  const addNewBookEntry = document.querySelector(".add-book-popup button")
  const newBookTitle = document.getElementById("book-title").value;
  const newBookAuthor = document.getElementById("book-author").value;
  const newBookPublished = document.getElementById("book-published").value;
  const newBookHaveRead = document.getElementById("book-have-read").checked;

  addNewBookEntry.addEventListener("click", (e) => {
    e.preventDefault();
    
    libraryArray.push(new Book(newBookTitle, newBookAuthor, newBookPublished, newBookHaveRead));
    refreshDOMBookList(libraryArray, libraryDOM)
    addEventListenersToRemoveBookButtons();
  })
} 

// Refresh DOM book list
const refreshDOMBookList = function(libraryArray, libraryDOM) {
  removeAllChildNodes(libraryDOM);
  for (const i in libraryArray) {
    bookList.appendChild(
      Book.insertNewBookToDOM(
        libraryArray[i].title,
        libraryArray[i].author,
        libraryArray[i].published,
        libraryArray[i].haveRead,
        i,
      )
    );
  }
}

function removeAllChildNodes(parentNode) {
  while(parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

const addEventListenersToRemoveBookButtons = function() {
  buttonsRemoveBook = document.querySelectorAll(".book > button");
 
  // Remove book from library (array and DOM)
  buttonsRemoveBook.forEach((buttonRemoveThisBook) => {
    buttonRemoveThisBook.setAttribute("data-listener", true);
    buttonRemoveThisBook.addEventListener("click", (e) => {
      e.preventDefault();
      const dataIndex = +e.target.attributes[0].value; 

      const bookToBeRemovedFromDOM = document.querySelector(`[data-index="${dataIndex}"]`);
      bookList.removeChild(bookToBeRemovedFromDOM);                   // Removes book card from DOM
      Book.deleteBookFromLibrary(myLibrary, bookList, dataIndex);     // Removes book object from Array
    })
  })
};

addEventListenersToAddBookButton();
refreshDOMBookList(myLibrary, bookList);
addEventListenersToRemoveBookButtons();

//TODO: View book card on click of .book container
(function(){

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

    const bookAttribList = document.createElement("ul");

    const bookAuthor = document.createElement("li");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = `Author: ${author}`;

    const bookPublished = document.createElement("li");
    bookPublished.classList.add("book-published");
    bookPublished.textContent = `Published: ${published}`;

    const bookRead = document.createElement("li");
    bookRead.classList.add("book-have-read");
    bookRead.setAttribute("data-index", libraryIndex);
    haveRead
      ? (bookRead.textContent = "I have read this book already.")
      : (bookRead.textContent = "I have NOT read this book yet.");

    bookAttribList.appendChild(bookAuthor);
    bookAttribList.appendChild(bookPublished);
    bookAttribList.appendChild(bookRead);

    const toggleHaveReadDiv = document.createElement("div");

    const toggleHaveRead = document.createElement("label");
    toggleHaveRead.classList.add("switch");

    const toggleCheckbox = document.createElement("input");
    toggleCheckbox.setAttribute("type", "checkbox")
    toggleCheckbox.setAttribute("data-index", libraryIndex);
    haveRead
      ? (toggleCheckbox.checked = true)
      : (toggleCheckbox.checked = false);

    const toggleSlider = document.createElement("span");
    toggleSlider.classList.add("slider");

    toggleHaveRead.appendChild(toggleCheckbox);
    toggleHaveRead.appendChild(toggleSlider);

    toggleHaveReadDiv.appendChild(document.createElement("p"));
    toggleHaveReadDiv.firstChild.textContent = "Have you read this book?";
    toggleHaveReadDiv.appendChild(toggleHaveRead);

    const removeBook = document.createElement("button");
    removeBook.textContent = "Remove Book";
    removeBook.setAttribute("data-index", libraryIndex);

    book.appendChild(bookTitleH1);
    book.appendChild(bookAttribList);
    book.appendChild(toggleHaveReadDiv);
    book.appendChild(removeBook);

    return book;
  }

  static deleteBookFromLibrary(libraryArray, libraryDOM, libraryIndex) {
    libraryArray.splice(libraryIndex, 1);
    // HACK: This is OBVIOUSLY not scalable. This deletes the whole DOM 
    // inside the '.book-list' div and re-renders it since this ain't some async implementation
    refreshDOMBookList(libraryArray, libraryDOM);
    addEventListenersToRemoveBookButtons(libraryArray, libraryDOM);
    addEventListenersToToggleSwitchHaveRead(libraryArray);
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

// NOTE: Event Listeners are removed when the DOM is refreshed thus the need 
// to reassign eventListeners to the nodes again 
// (that's why I am using 'let' instead of 'const' here)
let toggleSwitchHaveRead = document.querySelectorAll(".switch > input");
let buttonsRemoveBook = document.querySelectorAll(".book > button");

// Open new Book pop up window
const addEventListenerToAddBookButton = function(libraryArray, libraryDOM) {
  addABookButton.addEventListener("click", (e) => {
    e.preventDefault();
    addBookPopupWindow.classList.toggle("visible");
    if (addBookPopupWindow.classList.contains("visible")) {
      addABookButton.classList.add("popup-active");
      addABookButton.textContent = "Close window";
      insertNewBookToArrayAndDOM(libraryArray, libraryDOM);
    }
    else {
      addABookButton.classList.remove("popup-active");
      addABookButton.textContent = "Add a book";
    }
  });
}

// Insert new Book to library and DOM
const insertNewBookToArrayAndDOM = function(libraryArray, libraryDOM) {
  // BUG: Popup form fields insert multiple cards equal to number of times Add A Book
  // has been pressed. Possible mishandling of data being pushed to the array.
  // Suspicion: Event Listener is attached every time THIS^ function is invoked and 
  // logs N times if the popup window is closed
  // HACK: Close the window and clear input fields after form submission
  // NOTE: Add form validation before closing window, 3 of the input fields are REQUIRED.
  const addNewBookEntry = document.querySelector(".add-book-popup button")
  const newBookTitle = document.getElementById("book-title");
  const newBookAuthor = document.getElementById("book-author");
  const newBookPublished = document.getElementById("book-published");
  const toggleSwitchNewBookHaveRead = document.getElementById("book-have-read");
  let newBookHaveRead = toggleSwitchNewBookHaveRead.checked;

  toggleSwitchNewBookHaveRead.addEventListener("click", () => {
    newBookHaveRead = toggleSwitchNewBookHaveRead.checked;
  })

  // This listener will close the pop up window and submit.
  function closePopUp(e) {
    e.preventDefault();
    e.target.setAttribute("data-popup-listener", true);     
    // does not actually require to be true, as long as the attribute exists, 
    // creation of the additional event listeners is thwarted
    
    libraryArray.push(new Book(
      newBookTitle.value, 
      newBookAuthor.value, 
      newBookPublished.value, 
      newBookHaveRead));
    refreshDOMBookList(libraryArray, libraryDOM)
    addEventListenersToRemoveBookButtons(libraryArray, libraryDOM);

    addABookButton.classList.remove("popup-active");
    addABookButton.textContent = "Add a book";

    addBookPopupWindow.classList.remove("visible");
    document.getElementById("add-book-popup-form").reset();
  }

  if(!addNewBookEntry.getAttribute("data-popup-listener")){
    addNewBookEntry.addEventListener("click", closePopUp);
  }
} 

// Refresh DOM book list
const refreshDOMBookList = function(libraryArray, libraryDOM) {
  removeAllChildNodes(libraryDOM);
  for (const i in libraryArray) {
    libraryDOM.appendChild(
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

const addEventListenersToRemoveBookButtons = function(libraryArray, libraryDOM) {
  buttonsRemoveBook = document.querySelectorAll(".book > button");
 
  // Remove book from library (array and DOM)
  buttonsRemoveBook.forEach((buttonRemoveThisBook) => {
    buttonRemoveThisBook.setAttribute("data-listener", true);
    buttonRemoveThisBook.addEventListener("click", (e) => {
      e.preventDefault();
      const dataIndex = +e.target.attributes["data-index"].value; 

      const bookToBeRemovedFromDOM = document.querySelector(`.book[data-index="${dataIndex}"]`);
      // NOTE: Removes book card from DOM
      libraryDOM.removeChild(bookToBeRemovedFromDOM);
      // NOTE: Removes book object from array
      Book.deleteBookFromLibrary(libraryArray, libraryDOM, dataIndex);
    })
  })
};

const addEventListenersToToggleSwitchHaveRead = function(libraryArray) {
  toggleSwitchHaveRead = document.querySelectorAll(".switch > input");  

  toggleSwitchHaveRead.forEach((toggleSwitch) => {
    toggleSwitch.setAttribute("data-listener", true);
    toggleSwitch.addEventListener(("click"), (e) => {
      const dataIndex = +e.target.attributes["data-index"].value; 
      const toggleStatus = e.target.checked;
      const elementToToggleReadStatus = document.querySelector(
        `.book-have-read[data-index="${dataIndex}"]`
      );
      if (toggleStatus) {
        libraryArray[dataIndex].haveRead = true;
        elementToToggleReadStatus.textContent = "I have read this book already.";
      }
      else {
        libraryArray[dataIndex].haveRead = false;
        elementToToggleReadStatus.textContent = "I have NOT read this book yet.";
      }

    })
  })
}

addEventListenerToAddBookButton(myLibrary, bookList);
refreshDOMBookList(myLibrary, bookList);
addEventListenersToRemoveBookButtons(myLibrary, bookList);
addEventListenersToToggleSwitchHaveRead(myLibrary);
})();

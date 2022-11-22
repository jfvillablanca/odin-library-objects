const myLibrary = [];

class Book {
  constructor(title, author, published) {
    this.title = title;
    this.author = author;
    this.published = published;
  }
}

// Filler Data

myLibrary.push(new Book("A Discipline of Programming", "Edsger W. Dijkstra", "1976"));
myLibrary.push(new Book("Das Kapital, Volume I", "Karl Marx", "1867"));

console.dir (myLibrary);

// DOM Stuff

const bookList = document.querySelector(".book-list");

const newBook = function(title, author, published) {
  const book = document.createElement("div");
  book.classList.add("book");

  const bookTitleH1 = document.createElement("h1");
  bookTitleH1.classList.add("book-title");
  bookTitleH1.textContent = title;

  const bookAttrib = document.createElement("ul");
  
  const bookAuthor = document.createElement("li")
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = `Author: ${author}`;

  const bookPublished = document.createElement("li")
  bookPublished.classList.add("book-published");
  bookPublished.textContent = `Published: ${published}`;
  
  bookAttrib.appendChild(bookAuthor);
  bookAttrib.appendChild(bookPublished);

  book.appendChild(bookTitleH1);
  book.appendChild(bookAttrib);

  return book;
}



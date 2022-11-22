const myLibrary = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Filler Data

myLibrary.push(new Book("A Discipline of Programming", "Edsger W. Dijkstra"));
myLibrary.push(new Book("Das Kapital Volume I", "Karl Marx"));

console.dir (myLibrary);

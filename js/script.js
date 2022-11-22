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

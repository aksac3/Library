class Book {
    constructor(title, author, pages, isRead, isbn) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.isRead = isRead;
      this.isbn = isbn;
    }
  }
  
  
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');
      row.classList.add('book-row');
      row.dataset.isbn = book.isbn;
  
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.isRead}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete" data-isbn="${book.isbn}">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if (el.classList.contains('delete')) {
        const isbn = el.dataset.isbn;
        document.querySelector(`.book-row[data-isbn="${isbn}"]`)
          .remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
     setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#pages').value = '';
      document.querySelector('#isbn').value = '';
    }
  }
  

  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  

  document.querySelector('#book-form').addEventListener('submit', (e) => {
  
    e.preventDefault();
  
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    let isRead = document.querySelector('input[name="formRead"]:checked').value;
    const isbn = document.querySelector('#isbn').value;
  
    
    if(title === '' || author === '' || pages === '' ||  isRead === '' || isbn === '') {
      UI.showAlert('All fields are requiered!', 'danger');
    } else {
      
      const book = new Book(title, author, pages, isRead, isbn);
  
      
      UI.addBookToList(book);
  
      
      Store.addBook(book);
  
      
      UI.showAlert('Book Added Successfully!', 'primary');
  
      
      UI.clearFields();
    }
  });
  
  
  document.querySelector('#book-list').addEventListener('click', (e) => {
   
    UI.deleteBook(e.target);
  
    
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    
    UI.showAlert('Book Removed From Your List', 'info');
  });
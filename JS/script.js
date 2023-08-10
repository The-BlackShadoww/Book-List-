//! ==> Define DOM elements

let form = document.querySelector('#book-form');
let bookList = document.querySelector('#book-list');

//! ==> Create the Book Class

class Book {
    constructor(title1, author1, isbn1) {
        this.title = title1;
        this.author = author1;
        this.isbn = isbn1;
    }
}
// let book = new Book('apple', 'me', '51520')
// console.log(book);

//! ==> Create the UI Class

class UI {
    constructor() {

    }

    static addToBookList(book) {     //* it is function declaring
        // console.log(book);
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title} </td>
        <td>${book.author} </td>
        <td>${book.isbn} </td>
        <td> <a href='#'> Delete </a> </td>`

        row.lastChild.children[0].className = `close-btn`;

        list.appendChild(row);
        
    }

    static clearField(){   //* this function is making title, author, and isbn field empty.
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }


    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');

        //* Putting the div between the container and form
        container.insertBefore(div, form);

        setTimeout(function() {
            document.querySelector('.' + className).remove();
        }, 2000);
    }

    static deleteFromBook(target) {
        if(target.hasAttribute('href')){
            if(confirm('Once you delete this, it will also be deleted from local storage. Would you still delete it')){
                target.parentElement.parentElement.remove();
                store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
                UI.showAlert('Book Removed', 'success');
            }
        }
    }

}


//! ==> Create Local Storage  Class

class store {
    static getBooks() {
        let books;

        if(localStorage.getItem('bookStore') === null) {
            books = [];
            // console.log(books);
        }
        else{
            books = JSON.parse(localStorage.getItem('bookStore'));
        }

        return books;
    }

    static addBooks(book) {
        let books = store.getBooks();
        // console.log(books);

        books.push(book);

        // console.log(books);

        localStorage.setItem('bookStore', JSON.stringify(books))
    }

    static displayBooks() {
        let books = store.getBooks();

        books.forEach(item => {
            UI.addToBookList(item);
        })
    }

    static removeBook(isbn) {
        let books = store.getBooks();

        books.forEach((item, index) => {
            if(item.isbn == isbn) {
                books.splice(index, 1);
            }
        })

        localStorage.setItem('bookStore', JSON.stringify(books));
    }
}




//! ==> Define Event listeners

form.addEventListener('submit', newBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', store.displayBooks());
// document.addEventListener('DOMContentLoaded', returnBookToDOM)
// bookList.addEventListener('click', deleteBook);




//! ==> Define Functions

function newBook(e) {
    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value

    let newBook = new Book(title, author, isbn);
    // console.log(newBook);

    // let newUI = new UI();
    // console.log(newUI);

    if(title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill all the fields!", "error");
    }
    else{
        
        UI.addToBookList(newBook);
    
        UI.clearField(); //* here we are calling the clare field function 

        UI.showAlert("Book Added!", "success");

        //todo Storing data to local storage

        store.addBooks(newBook);

        // storeBookToLS(newBook);
    }

    e.preventDefault();
}




function removeBook (e) {
    e.preventDefault();
    
    // let ui = new UI();
    UI.deleteFromBook(e.target);



    //todo removing from LS


    let targetElement = e.target.parentElement.parentElement;
    // console.log(targetEle);

    // removeFromLS(targetElement);

    
}










//* ===>>> Functions done by me 


function deleteBook (e) {

    if(e.target.hasAttribute('href')) {
        let bookItem = e.target.parentElement.parentElement;
        bookItem.remove();
    }

    e.preventDefault();
}


function storeBookToLS(bookInfo) {
    let books;

    if(localStorage.getItem('bookStore') === null) {
        books = [];
        // console.log(books);
    }
    else{
        books = JSON.parse(localStorage.getItem('bookStore'));
    }

    books.push(bookInfo)

    // console.log(books);

    localStorage.setItem('bookStore', JSON.stringify(books));
}


function returnBookToDOM() {

    let books;

    if(localStorage.getItem('bookStore') === null) {
        books = [];
    }
    else{
        books = JSON.parse(localStorage.getItem('bookStore'));
    }

    books.forEach(item => {
        // console.log(item);
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.title} </td>
        <td>${item.author} </td>
        <td>${item.isbn} </td>
        <td> <a href='#'> X </a> </td>`
        list.appendChild(row);
    });
}



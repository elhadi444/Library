let myLibrary = [];

const bookContainer = document.querySelector('.book-container')

const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')

const title = document.querySelector('#input-title')
const author = document.querySelector('#input-author')
const pages = document.querySelector('#input-pages')
const read = document.querySelector('#input-read')

// object book
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// adding books
function addBookToLibrary(book) {
    myLibrary.push(book)
}

// display books
function displayBooks() {
    // clear book container
    while (bookContainer.firstChild) {
        bookContainer.firstChild.remove()
    }

    // for each element in myLibrary array it displays
    myLibrary.forEach(b => {
        let book = document.createElement('div')
        book.classList = 'book'
        book.dataset.index = myLibrary.indexOf(b)

        let read
        let classRead

        if (b.read) {
            read = 'Read'
            classRead = 'read'
        } else {
            read = 'Not read yet'
            classRead = 'not-read'
        }

        book.innerHTML = `<div class="book-title"><span class="indication">book title :</span>${b.title}</div>
                        <div class="book-author"><span class="indication">author :</span>${b.author}</div>
                        <div class="book-pages"><span class="indication">${b.pages} pages</span></div>
                        <button class="${classRead}">${read}</button>
                        <button class="remove">remove</button>`

        bookContainer.appendChild(book)

    });


    // event listener read/not-read and setting the read attribute of the object to true/false and redisplay
    document.querySelectorAll('.not-read').forEach(btn => btn.addEventListener('click', () => {
        // index is data attribute "index" of the parent of the button (with the class 'book')
        myLibrary[btn.parentElement.dataset.index].read = true
        displayBooks()
    }))

    document.querySelectorAll('.read').forEach(btn => btn.addEventListener('click', () => {
        myLibrary[btn.parentElement.dataset.index].read = false
        displayBooks()
    }))

    // event listener to remove element from the array and redisplay
    document.querySelectorAll('.remove').forEach(btn => btn.addEventListener('click', () => {
        myLibrary.splice([btn.parentElement.dataset.index], 1)
        displayBooks()
    }))

}
displayBooks()


// event listener for the add button
document.querySelector('.btn-add').addEventListener('click', e => {

    document.querySelector('.form').reset() // reset the form input fields

    title.classList.remove('required') // removing the class '.required' (adds red border when fields are not filled)
    author.classList.remove('required')
    pages.classList.remove('required')

    overlay.classList.toggle('active') // adding class '.active' to the overlay and modal (can replace 'toggle' by 'add')
    modal.classList.toggle('active')
})

// event listener on the ovelay for exiting the adding book form
overlay.addEventListener('click', e => {
    overlay.classList.toggle('active') // removing class '.active' from the overlay and modal (can replace 'toggle' by 'remove')
    modal.classList.toggle('active')
})

// event listener for the add book button
document.querySelector('#btn-add-book').addEventListener('click', e => {
    e.preventDefault() // prevent submiting

    // if the fields are not empty => making new book object => adding it to the array => removing class '.active' from the overlay and modal => call displayBooks() 
    if (title.value !== '' && author.value !== '' && pages.value !== '') {
        let book = new Book(title.value, author.value, pages.value, read.checked)
        addBookToLibrary(book)
        overlay.classList.toggle('active')
        modal.classList.toggle('active')
        displayBooks()
    } else { /// removing the class '.required'
        if (title.value === '') title.classList.add('required')
        if (author.value === '') author.classList.add('required')
        if (pages.value === '') pages.classList.add('required')
    }

})

// event listener for fields on change to add or remove the class '.required'
document.querySelectorAll('input').forEach(input => input.addEventListener('change', () => {
    if (input.value === '') input.classList.add('required')
    else input.classList.remove('required')
}))





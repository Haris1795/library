const addBooks = document.querySelector('.add-btn'),
    all = document.querySelector('main'),
    form = document.querySelector('.form'),
    bookName = document.querySelector('input[name="bookName"]'),
    authorName = document.querySelector('input[name="authorName"]'),
    imgLink = document.querySelector('input[name="imageLink"]'),
    pageNum = document.querySelector('input[name="pageNum"]'),
    submit = document.querySelector('.bookSubmit'),
    checkBox = document.querySelector('.checkyBox'),
    div = document.querySelector('.books-container'),
    info = document.querySelector('.info'),
    allImg = document.querySelectorAll('.book-img')

let allBooks = [];
let newBook;
let closeButton;

class Book {
    constructor(title, author, pages, image, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.image = image;
    }
    info() {
        return `${title}, ${author}, ${pages}, ${read}`
    }
    func() {
        console.log(title + ' ' + author + ' ' + pages + ' ' + read)
    }
    functo(){
       const {title, author, pages, image, read} = this;
       console.log(title + ' ' + author + ' ' + pages + ' ' + image)
    }
}


submit.addEventListener('click', (event) =>{
    event.preventDefault()

    let bookTitle = bookName.value 
    let nameOfAuthor = authorName.value
    let pageNumber = pageNum.value
    let pic = imgLink.value
    let read = checkBox.checked 

    newBook = new Book(bookTitle, nameOfAuthor, pageNumber, pic, read)
    allBooks.push(newBook)
    createBook(newBook)
    info.reset()
    form.hidden = true;
    
    window.localStorage.clear()
    window.localStorage.setItem("myLibrary", JSON.stringify(allBooks))
});

function createBook(book) {
    // Creating the book container
    div2 = document.createElement('div')
    div.appendChild(div2)
    div2.classList.add('book')

    // Adding the rest of the information
    h4 = document.createElement('h4')
    div2.appendChild(h4)
    h4.classList.add('title')
    h4.textContent = book.title

    p = document.createElement('p')
    div2.appendChild(p)
    p.classList.add('author')
    p.textContent = book.author

    img = document.createElement('img')
    div2.appendChild(img)
    img.classList.add('book-img')
    img.src = imgLink.value
    console.log(img.src)

    // Provides a default image if one has not been added
    if (img.src === "http://127.0.0.1:5500/Library/undefined") {
        console.log('what')
        img.src = './default.jpg'
    }

    p2 = document.createElement('p')
    div2.appendChild(p2)
    p2.classList.add('pages');
    p2.textContent = book.pages

    // Adding the checkbox
    label = document.createElement('label')
    div2.appendChild(label)
    label.classList.add('check-container');
    text = document.createTextNode('Read')
    label.appendChild(text)

    input = document.createElement('input')
    label.appendChild(input)
    input.type = 'checkbox'
    input.checked = book.read

    span = document.createElement('span')
    label.appendChild(span)
    span.classList.add('checkmark');

    butn = document.createElement('button')
    div2.appendChild(butn)
    butn.classList.add('close');

    for (let i = 0; i < allImg.length; i++) {
        console.log(allImg[i])
    }
}

function fuck() {
    closeButton = document.querySelector('.close')
    closeButton.addEventListener('click', () => {
        console.log('jebo te bog')
    })
}

// Event for closing the form when clicked outside of its boundaries
all.addEventListener('click', ()=>{
    if (form.hidden === false){
        form.hidden = true
    }
})

// Button function for displaying the hidden form
function openForm() {
    if (form.hidden === true){
        form.hidden = false
    }
}

function renderLibraryStorage() {
    if(localStorage.myLibrary) {
        let getBooks = JSON.parse(localStorage.getItem("myLibrary"))
        myLibrary = getBooks
        myLibrary.map((value) => {
            createBook(value)
        })
    }
}

renderLibraryStorage()
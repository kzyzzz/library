let addBookForm = document.getElementById('addBookForm');
let addButton = document.querySelector('#addBook');
let library = document.querySelector('.library');
let input = addBookForm.querySelectorAll('input');

let myLibrary = [];

getData();
renderLibrary();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

Book.prototype.remove = function(){
    console.log(myLibrary.indexOf(this));
    myLibrary.splice(myLibrary.indexOf(this), 1);
}

Book.prototype.read = function(state){
    this.read = state;
}

Book.prototype.info = function() {
    return `{title:${this.title},author:${this.author},pages:${this.pages},read:${this.read}}`;
}

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    renderLibrary();
}


function renderLibrary(){
    library.innerHTML = '';
    myLibrary.map((item, index)=>{
        let newBookCard = createBookCard(item, index);
        library.appendChild(newBookCard);
    })
    setData();
}

function createBookCard(item, index) {
    let bookCard = document.createElement('div');

        let bookCardCover = document.createElement('div');
        let bookCardInfo = document.createElement('div');
        
        let bookCardHeader = document.createElement('div');
        let bookCardMain = document.createElement('div');
        let bookCardFooter = document.createElement('div');

        let title = document.createElement('h2');
        let author = document.createElement('h4');
        let pages = document.createElement('h6');
    
        let checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        
        let removeButton = document.createElement('button');
        removeButton.id = `remove-${index}`;

        bookCard.id = index;
    
        title.textContent = item.title;
        author.textContent = item.author;
        pages.textContent = 'Pages: ' + item.pages;
        removeButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    
        bookCardHeader.appendChild(title);
        bookCardMain.appendChild(author);
        bookCardMain.appendChild(pages);
        bookCardFooter.appendChild(checkbox);
        bookCardFooter.appendChild(removeButton);

        bookCard.appendChild(bookCardCover);

        bookCardInfo.appendChild(bookCardHeader);
        bookCardInfo.appendChild(bookCardMain);
        bookCardInfo.appendChild(bookCardFooter);
        bookCard.appendChild(bookCardInfo);
    
        if (item.read) checkbox.checked = true;
    
        bookCard.classList.add('book-card');
        bookCardCover.classList.add('book-card-cover');
        bookCardInfo.classList.add('book-card-info');
        bookCardHeader.classList.add('book-card-header');
        bookCardMain.classList.add('book-card-main');
        bookCardFooter.classList.add('book-card-footer');

        removeButton.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'btn-round')

        removeButton.addEventListener('click', () => {
            item.remove();
            renderLibrary();
        })

        checkbox.addEventListener('click', () => {
            if (item.read) {item.read = false} else {item.read = true};
            renderLibrary();
            console.log(myLibrary[index]);
        })
        return bookCard;
}


addButton.addEventListener('click', () => bookAddHidden(false));

function bookAddHidden(state){
    if (state == true) {
        addBookForm.style.display = 'none';
    } else {
        addBookForm.style.display = 'flex';
    }
}


let submit = document.querySelector('#submitBook');
submit.addEventListener('click',()=>{
    let newBook = {};

    if ([...input].every((item) => item.value != '')) {
        input.forEach((item)=>{
            newBook[item.name] = item.value;
            if (item.name == 'read') {newBook[item.name] = item.checked} else {item.value = ''}
        })

    addBookToLibrary(newBook.title, newBook.author, newBook.pages, newBook.read);
    bookAddHidden(true);
    }
})

addBookForm.addEventListener('click', (e)=>{
    
    if (e.target.id === 'addBookForm') bookAddHidden(true);
})


function setData() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function getData() {
    let storedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    storedLibrary.map((book) => {
        addBookToLibrary(book.title, book.author, book.pages, book.read);
    });
}

let checkboxes = document.querySelectorAll('.form-check-input');
console.log(checkboxes);
checkboxes.forEach((checkbox)=>{
    checkbox.addEventListener('click', ()=>{
        console.log(checkbox.name);
    });
})

let addBookForm = document.getElementById('addBookForm');
let addButton = document.querySelector('#addBook');
let library = document.querySelector('.library');
let input = addBookForm.querySelectorAll('input');

let myLibrary = [
    {
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        pages:  '350',
        read: false
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        pages:  '300',
        read: true
    },
    {
        title: 'Great Expectations',
        author: 'Charles Dickens',
        pages:  '318',
        read: true
    },
    {
        title: 'Tne Hundred Years of Solitude',
        author: 'Gabriel Garcia Marquez',
        pages: '450',
        read: true
    }
];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;  
    }
    remove() {
        console.log(myLibrary.indexOf(this));
        myLibrary.splice(myLibrary.indexOf(this), 1);
    }
    read(state) {
        this.read = state;
    }
    info() {
        return {title, author, pages, read}; 
    }
    
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

        let title = document.createElement('h4');
        let author = document.createElement('h5');
        let pages = document.createElement('h6');
    
        let checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('form-check', 'form-switch');
        
        let checkbox = document.createElement('input');
        checkbox.classList.add('form-check-input');
        checkbox.setAttribute('name', `read-${index}`);
        checkbox.setAttribute("type", "checkbox");

        let label = document.createElement('label');
        label.classList.add('form-check-label');
        label.setAttribute('for', `read-${index}`);
        label.textContent = 'Read';

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        
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
        bookCardFooter.appendChild(checkboxDiv);
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

        removeButton.classList.add('btn', 'btn-outline-danger', 'btn-sm');
        removeButton.style.border = 'none';

        removeButton.addEventListener('click', () => {
            item.remove();
            renderLibrary();
        })

        checkbox.addEventListener('transitionend', () => {
            item.read = checkbox.checked;
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
    if (storedLibrary != null) {
        myLibrary = [];
        storedLibrary.map((book) => {
            addBookToLibrary(book.title, book.author, book.pages, book.read);
        });
    }
}


getData();
renderLibrary();
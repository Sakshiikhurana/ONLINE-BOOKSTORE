
// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch featured books from the server
//     fetchFeaturedBooks();
// });

async function fetchFeaturedBooks() {
    let values = ["fantasy", "romance", "mystery", "horror", "science fiction", "non-fiction"];
    values = document.getElementById('searchInput').value;
    const options = {
        method: 'GET',
        url: 'https://books-api7.p.rapidapi.com/books/find/genres',
        params: {
            'genres[]': [
                values
            ]
        },
        headers: {
            'X-RapidAPI-Key': 'bc03eb50eemsh859da3549630d80p170e07jsn5624c286e2d2',
            'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        let result = response.data;
        const booksList = result.map((book) => {
            return {
                title: book.title,
                author: `${book.author.first_name} ${book.author.last_name}`,
                imageUrl: book.cover
            }
        })
        console.log(booksList);
        // result = JSON.parse(result);
        // const books = [
        //   { title: "The Book of Spells", author: "Merlin", imageUrl: "/images/book1.jpg" },
        //   { title: "Ancient Runes: A Guide", author: "Rowena Ravenclaw", imageUrl: "/images/ancient.jpg" },
        //   { title: "The Art of Potion-making", author: "Severus Snape", imageUrl: "/images/potion.jpeg" },
        //     // { title: result.title, author: result["author"]["first_name"] + " " + result["author"]["last_name"], imageUrl: result["cover"] }
        // ];
        displayBooks(booksList);
    } catch (error) {
        console.error(error);
    }
}

function displayBooks(books) {
    const booksContainer = document.querySelector('.books');


    booksContainer.innerHTML = '';

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const image = document.createElement('img');
        image.src = book.imageUrl;
        image.alt = book.title;

        const title = document.createElement('h3');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = 'By ' + book.author;

        bookElement.appendChild(image);
        bookElement.appendChild(title);
        bookElement.appendChild(author);

        booksContainer.appendChild(bookElement);
    });
}

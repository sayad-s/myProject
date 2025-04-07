const URL = "http://localhost:3003/books";
// const URL = "https://frabjous-wisp-a5a7ea.netlify.app/";
// 123456

async function fetchBooks() {
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const books = await res.json();
        const list = document.getElementById("book-list");
        list.innerHTML = "";
        books.forEach(book => {
            const li = document.createElement("li");
            li.innerHTML = `${book.title} - ${book.author} - ${book.pages} pages - $${book.price} 
            <button onclick="deleteBook(${book.id})">Delete</button>`;
            list.appendChild(li)
        });

    } catch (err) {
        console.error('Error fetching books', err);
    }
}

// add a book
document.getElementById("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        pages: document.getElementById("pages").value,
        price: document.getElementById("price").value,
    };

    await fetch(URL, { 
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(book),
    });

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("price").value = "";
    
    fetchBooks(); // refresh list
});

// delete a book
async function deleteBook(id) {
    await fetch(`${URL}/${id}`, { method: "DELETE" });
    fetchBooks();
}

fetchBooks();
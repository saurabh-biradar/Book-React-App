import React, { useEffect } from "react";
import { useState } from "react";
import CreateBook from "./CreateBook";
import Book from "./Book";
import axios from "axios";
import "./index.css";

export default function ListBooks() {
  const [books, setBooks] = useState([]);
  const url = "http://localhost:8085/";

  function getAllBooks() {
    axios
      .get(url + "books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllBooks();
  }, [books]);

  function addBook(book) {
    console.log(book);
    axios
      .post(url + "books", book)
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    setBooks((prevBooks) => {
      return [...prevBooks, book];
    });
  }

  function deleteBook(index) {
    console.log("Delete called on Book with Id:" + index);
    let id = books[index].id;
    axios
      .delete(url + "book/" + id)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.log(err));
    setBooks((prevBooks) => {
      return prevBooks.filter((book, idx) => index != idx);
    });
  }

  function editBook(index, newBook) {
    let id = books[index].id;
    axios
      .put(url + "book/" + id, { id: id, ...newBook })
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err));
    setBooks((prevBooks) => {
      const newBooks = [...prevBooks];
      newBooks[index].name = newBook.name;
      newBooks[index].price = newBook.price;
      return newBooks;
    });
  }

  return (
    <div>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <h2>
                  Book <b>Details</b>
                </h2>
              </div>
              <div className="col-sm-4">
                <button
                  type="button"
                  className="btn btn-info add-new"
                  onClick={() => {
                    addBook({ name: "", price: "" });
                  }}
                >
                  <i className="fa fa-plus"></i> Add New
                </button>
              </div>
            </div>
          </div>
          {books.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {books.map((book, index) => {
                    return (
                      <Book
                        key={book.id}
                        index={index}
                        book={book}
                        deleteBook={deleteBook}
                        editBook={editBook}
                      />
                    );
                  })}
                </>
              </tbody>
            </table>
          ) : (
            <div class="alert alert-secondary empty-book-message" role="alert">
              Your book list is currently empty. Add some books to start
              browsing!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

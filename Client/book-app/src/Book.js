import React, { useEffect, useState } from "react";
import "./index.css";

export default function Book(props) {
  const [book, setBook] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.book.name == "" && props.book.price == 0) setShow(true);
  }, []);

  function handleBookDelete() {
    props.deleteBook(props.index);
  }

  function handleBookEdit(e) {
    if (show) handleSubmit(e);
    setShow((prevShow) => !prevShow);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setBook({ ...book, [name]: value });
    console.log(book);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(book);
    props.editBook(props.index, book);
  }

  return (
    <>
      {show ? (
        <tr>
          <td>{props.index + 1}</td>
          <td>
            <input
              type="text"
              class="form-control"
              id="bookName"
              name="name"
              onChange={handleChange}
              value={book.name}
              placeholder="Enter Book Name"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              id="bookPrice"
              name="price"
              onChange={handleChange}
              value={book.price}
              placeholder="Enter Book Price"
            />
          </td>
          <td>
            <a
              className="add"
              title="Add"
              data-toggle="tooltip"
              onClick={handleBookEdit}
            >
              <i className="material-icons">&#xE03B;</i>
            </a>

            <a
              className="delete"
              title="Delete"
              data-toggle="tooltip"
              onClick={handleBookDelete}
            >
              <i className="material-icons">&#xE872;</i>
            </a>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{props.index + 1}</td>
          <td>{props.book.name}</td>
          <td>{props.book.price}</td>
          <td>
            <a
              className="edit"
              title="Edit"
              data-toggle="tooltip"
              onClick={handleBookEdit}
            >
              <i className="material-icons">&#xE254;</i>
            </a>
            <a
              className="delete"
              title="Delete"
              data-toggle="tooltip"
              onClick={handleBookDelete}
            >
              <i className="material-icons">&#xE872;</i>
            </a>
          </td>
        </tr>
      )}
    </>
  );
}

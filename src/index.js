import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ScotchInfoBar from "./ScotchInfoBar";
import "./styles.css";

function App() {
  const [books, setBooks] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      "https://prod-188.westeurope.logic.azure.com/workflows/5e69d4e4f7b64bf3852aecfa108bf47a/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=roVLAPGLufhOF3FZsznpgv6Bgqznw5Br86zruZ8s4xU"
    );

    const boeken = response.data;
    console.log(boeken);
    if (boeken) boeken.map((book) => console.log(book.title));
    setBooks(response.data);
  };

  return (
    <div className="App">
      <h1>Read by Marinus</h1>
      <h2>Fetch the list from Goodsreads (XML) convert it via Azure to JSON, trim it via Liquid, display in REACT.</h2>

      {/* Fetch data from API */}
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>
        <br />
      </div>

      {/* Display data from API */}
      <div className="books">
        {books &&
          books.map((book, index) => {
            var imageurl = book.bookimageURL;
            if (book.bookimageURL.includes("nophoto")) {
              //https://covers.openlibrary.org/b/ISBN/0060845503-M.jpg
              imageurl =
                "https://covers.openlibrary.org/b/ISBN/" + book.isbn + "-M.jpg";
              return; 
            }

            return (
              <div className="book" key={index}>
                <img src={imageurl} width="100%" alt="bookimage" />
                <div className="details">                 
                 {book.title}
                <p>👨: {book.author}</p>

                </div>
              </div>
            );
          })}
      </div>

    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

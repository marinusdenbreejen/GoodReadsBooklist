class BookList extends React.Component {
  render() {
    const books = this.props.books.filter(filterNoCover);
    const formattedBooks = books.map((book) =>
    React.createElement("div", { className: "book", key: book.title },
    React.createElement("img", { src: book.bookimageURL, width: "100%", alt: "bookimage" }),
    React.createElement("div", { className: "details" },
    book.title,
    React.createElement("p", null, "\uD83D\uDC64: ", book.author))));



    return (
      React.createElement("div", { className: "books" }, formattedBooks));

  }}


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [] };

    var myUrl = "https://prod-188.westeurope.logic.azure.com:443/workflows/5e69d4e4f7b64bf3852aecfa108bf47a/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=roVLAPGLufhOF3FZsznpgv6Bgqznw5Br86zruZ8s4xU";
    fetch(myUrl).
    then(response => response.json()).
    then(json => this.setState({ books: json }));


  }

  render() {
    console.log(this.state.books[0]);
    return (
      React.createElement("div", { className: "App" },
      React.createElement("h1", null, "Books read by Marinus"),
      React.createElement("h2", null, "Fetch the list from Goodsreads (XML) convert it via Azure to JSON, trim it via Liquid, display in REACT"),



      React.createElement(BookList, { books: this.state.books })));



  }}


function filterNoCover(book) {
  return !book.bookimageURL.includes("nophoto");
}


ReactDOM.render(
React.createElement(App, null),
document.getElementById('root'));
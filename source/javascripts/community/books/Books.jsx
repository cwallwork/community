import React                          from 'react';
import Header                         from '../Header.jsx';
import BookList                       from './BookList.js';
import BookItem                       from './BookItem.jsx';



class Books extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Books';
        this.fictionList =  BookList.fiction;
        this.nonfictionList = BookList.nonfiction;
        this.childrensList = BookList.childrens;
    }
    render() {
        const fiction = this.fictionList;
        const nonfiction = this.nonfictionList;
        const childrens = this.childrensList;

        return (
        <div className="books_container">
          <Header title="Books"/>
          <div className="booklist_container">
            <h3>FICTION</h3>
            <div className="fiction_container">
              {fiction.map((book, index) => <BookItem key={index} book={book}/>)}
            </div>
            <h3>NONFICTION</h3>
            <div className="nonfiction_container">
              {nonfiction.map((book,index) => <BookItem key={index} book={book}/>)}
            </div>
            <h3>CHILDREN&#39;S NONFICTION</h3>
            <div className="children_nonfiction_container">
              {childrens.map((book,index) => <BookItem key={index} book={book}/>)}
            </div>
          </div>
        </div>
      )
    }
}

export default Books;

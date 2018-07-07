import React, { Component } from 'react';

import BookList from './BookList';
import AddBook from './AddBook';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Anurag's Book List</h1>
        <BookList />
        <AddBook />
      </div>
    );
  }
}

export default App;

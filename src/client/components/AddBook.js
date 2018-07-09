import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery } from '../queries/author';
import { addBookMutation, getBooksQuery } from '../queries/book';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
      disableButton: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.name !== prevState.name ||
      this.state.genre !== prevState.genre ||
      this.state.authorId !== prevState.authorId
    ) {
      this.checkEmptyFields();
    }
  }

  displayAuthors() {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors ...</option>;
    }
    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }

  checkEmptyFields() {
    if (this.state.name && this.state.genre && this.state.authorId) {
      this.setState({ disableButton: false });
    } else if (!this.state.disableButton) {
      this.setState({ disableButton: true });
    }
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.name && this.state.genre && this.state.authorId) {
      this.props.addBookMutation({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId,
        },
        refetchQueries: [{ query: getBooksQuery }],
      });
      this.setState({
        name: '',
        genre: '',
        authorId: '',
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <form id="add-book" onSubmit={e => this.submitForm(e)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
            value={this.state.name}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => {
              this.setState({ genre: e.target.value });
            }}
            value={this.state.genre}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            onChange={e => {
              this.setState({ authorId: e.target.value });
            }}
            value={this.state.authorId}
          >
            <option value="">Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button disabled={this.state.disableButton}>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);

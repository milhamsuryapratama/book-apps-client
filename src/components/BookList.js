import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

//components
import BookDetails from '../components/BookDetails';

class BookList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: null
        }
    }

    displayBooks() {
        const data = this.props.data
        if (data.loading) {
            return (<div>Loading . . .</div>)
        } else {
            return data.books.map(book => {
                return (<li key={book.id} onClick={e => this.setState({ selected: book.id })}>{book.name}</li>)
            })
        }
    }

    render() {
        return (
            <Fragment>
                <ul>
                    {this.displayBooks()}
                </ul>
                <BookDetails bookId={this.state.selected} />
            </Fragment>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {

    displayBookDetails() {
        const { book } = this.props.data;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <h2>{book.genrer}</h2>
                    <h2>{book.author.name}</h2>
                    <p>All Books by this author : </p>
                    <ul>
                        {book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        } else {
            return <div>No Selected . . .</div>
        }
    }

    render() {
        return (
            <Fragment>
                <div><h1>Book Details</h1></div>
                {this.displayBookDetails()}
            </Fragment>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }

    displayAuthors() {
        const data = this.props.getAuthorsQuery;
        if (data.loading) {
            return (<option disabled>Loading Authors . . .</option>)
        } else {
            return data.authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
            ))
        }
    }

    submitForm(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm.bind(this)}>
                    <h3>Form Buku</h3>
                    <input type="text" placeholder="Isi Judul Buku" onChange={e => this.setState({ name: e.target.value })} /> <br /> <br />
                    <input type="text" placeholder="Isi Genre Buku" onChange={e => this.setState({ genre: e.target.value })} /> <br /> <br />
                    <select onChange={e => this.setState({ authorId: e.target.value })}>
                        {this.displayAuthors()}
                    </select>
                    <br /> <br />
                    <button>Simpan</button>
                </form>

            </div>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
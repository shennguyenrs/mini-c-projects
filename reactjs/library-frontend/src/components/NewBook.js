import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import useField from '../hooks/useField';

import { ALL_DATA, ADD_BOOK } from '../queries.js';

const NewBook = ({ show, setErr, changePage }) => {
  if (!show) return null;

  const [genres, setGenres] = useState([]);
  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetPublished, ...published } = useField('text');
  const { reset: resetGenre, ...genre } = useField('text');
  const [createBook, result] = useMutation(ADD_BOOK, {
    //refetchQueries: [{ query: ALL_DATA }],
    onError: (err) => {
      setErr(err.graphQLErrors[0].message);
    },
    // Using update to fectch data to cache
    update: (store, res) => {
      const dataInStore = store.readQuery({ query: ALL_DATA });
      store.writeQuery({
        query: ALL_DATA,
        data: {
          ...dataInStore,
          allAuthors: [...dataInStore.allAuthors],
          allBooks: [...dataInStore.allBooks, res.data.addBook],
        },
      });
    },
  });

  useEffect(() => {
    if (result.data) {
      // Redirect page to books
      changePage('books');
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: {
        title: title.value,
        published: Number(published.value),
        author: author.value,
        genres,
      },
    });

    resetTitle();
    resetPublished();
    resetAuthor();
    resetGenre();
    setGenres([]);
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.value));
    resetGenre();
  };

  return (
    <>
      <h2>add new book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </>
  );
};

export default NewBook;

// PropTypes validation
NewBook.propTypes = {
  show: PropTypes.bool,
  setErr: PropTypes.func,
  changePage: PropTypes.func,
};

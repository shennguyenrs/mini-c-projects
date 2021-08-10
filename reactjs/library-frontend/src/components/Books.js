import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState('all');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    let currentGenres = genres;

    books.map((a) => {
      currentGenres = currentGenres.concat(a.genres);
    });

    setGenres([...new Set(['all', ...currentGenres])]);
  }, [books]);

  const handleChooseGenre = (e) => {
    e.preventDefault();
    setGenre(e.target.value);
  };

  if (!show) return null;

  return (
    <>
      <h2>books</h2>
      <p>
        in genre <b>{genre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {(genre === 'all'
            ? books
            : books.filter((a) => a.genres.includes(genre))
          ).map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <input
            key={g}
            type="button"
            value={g}
            onClick={(e) => handleChooseGenre(e)}
          />
        ))}
      </div>
    </>
  );
};

export default Books;

// PropTypes validation
Books.propTypes = {
  show: PropTypes.bool,
  books: PropTypes.array,
};

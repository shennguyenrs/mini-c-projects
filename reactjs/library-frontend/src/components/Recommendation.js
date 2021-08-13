import React from 'react';
import PropTypes from 'prop-types';

const Recommendation = ({ show, loading, filteredBooks, favoriteGenre }) => {
  if (!show) return null;

  if (loading) return <>loading..</>;

  return (
    <>
      <h2>recommendation</h2>
      <p>
        your favorite genre is <b>{favoriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommendation;

// PropTypes validation
Recommendation.propTypes = {
  show: PropTypes.bool,
  loading: PropTypes.bool,
  filteredBooks: PropTypes.array,
  favoriteGenre: PropTypes.string,
};

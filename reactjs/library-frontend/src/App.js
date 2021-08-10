import React, { useState, useMemo } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';

// Import components
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Recommendation from './components/Recommendation';

import { ALL_DATA } from './queries';

const initToken = localStorage.getItem('user-token') || null;

const App = () => {
  const [page, setPage] = useState('authors');
  const [errMes, setErrMess] = useState(null);
  const [token, setToken] = useState(initToken);
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const client = useApolloClient();

  const { data, loading } = useQuery(ALL_DATA);

  if (loading) return <>Loading...</>;

  useMemo(() => {
    if (data) {
      setAuthors(data.allAuthors);
      setBooks(data.allBooks);
    }
  }, [data]);

  const notify = (message) => {
    setErrMess(message);
    setTimeout(() => {
      setErrMess(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear('user-token');
    client.resetStore();
    setPage('authors');
  };

  const loginedMenu = () => {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendation')}>
          recommendation
        </button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>
    );
  };

  const notLoginMenu = () => {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        <button onClick={() => setPage('signup')}>signup</button>
      </div>
    );
  };

  return (
    <>
      {token !== null ? loginedMenu() : notLoginMenu()}

      <div>
        <Notification errMes={errMes} />
        <Authors
          show={page === 'authors'}
          authors={authors}
          setErr={notify}
          isLogined={token !== null ? true : false}
        />
        <Books show={page === 'books'} books={books} />
        <Recommendation
          show={page === 'recommendation'}
          filteredBooks={books.filter((a) => a.genres.includes(favoriteGenre))}
          favoriteGenre={favoriteGenre}
        />
        <NewBook show={page === 'add'} setErr={notify} changePage={setPage} />
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setErr={notify}
          changePage={setPage}
          setFavoriteGenre={setFavoriteGenre}
        />
        <SignUpForm
          show={page === 'signup'}
          setErr={notify}
          setToken={setToken}
          changePage={setPage}
        />
      </div>
    </>
  );
};

export default App;

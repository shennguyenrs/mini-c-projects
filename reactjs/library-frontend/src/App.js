import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useQuery, useApolloClient, useLazyQuery } from '@apollo/client';

// Import components
/* import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Recommendation from './components/Recommendation'; */

// Dynamics import components
const Authors = lazy(() => import('./components/Authors'));
const Books = lazy(() => import('./components/Books'));
const NewBook = lazy(() => import('./components/NewBook'));
const Notification = lazy(() => import('./components/Notification'));
const LoginForm = lazy(() => import('./components/LoginForm'));
const SignUpForm = lazy(() => import('./components/SignUpForm'));
const Recommendation = lazy(() => import('./components/Recommendation'));

// Import queries
import { ALL_DATA, CURRENT_USER } from './queries';

const initToken = localStorage.getItem('user-token') || null;

const App = () => {
  const [page, setPage] = useState('authors');
  const [errMes, setErrMess] = useState(null);
  const [token, setToken] = useState(initToken);
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const client = useApolloClient();

  const { data: allData, loading } = useQuery(ALL_DATA, {
    onCompleted: () => {
      setAuthors(allData.allAuthors);
      setBooks(allData.allBooks);
    },
  });

  const [getUser, { data: currentUser, loading: currentUserLoading }] =
    useLazyQuery(CURRENT_USER, {
      onCompleted: () => {
        setFavoriteGenre(currentUser.me.favoriteGenre);
      },
      update: (store, res) => {
        const dataInStore = store.readQuery({ query: CURRENT_USER });
        store.writeQuery({
          query: CURRENT_USER,
          data: {
            ...dataInStore,
            me: {
              favoriteGenre: res.me.favoriteGenre,
            },
          },
        });
      },
    });

  useEffect(() => {
    if (token !== null) getUser();
  }, [token]);

  if (loading) return <>loading...</>;

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
      <Suspense fallback={<div>components loading...</div>}>
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
            loading={currentUserLoading}
            filteredBooks={books.filter((a) =>
              a.genres.includes(favoriteGenre)
            )}
            favoriteGenre={favoriteGenre}
          />
          <NewBook show={page === 'add'} setErr={notify} changePage={setPage} />
          <LoginForm
            show={page === 'login'}
            setToken={setToken}
            setErr={notify}
            changePage={setPage}
          />
          <SignUpForm
            show={page === 'signup'}
            setErr={notify}
            setToken={setToken}
            changePage={setPage}
          />
        </div>
      </Suspense>
    </>
  );
};

export default App;

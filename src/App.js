import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Box from './components/Box';
import MoviesList from './components/MoviesList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMoviesList from './components/WatchedMoviesList';
// import MoviesResultsNumber from './components/MoviesResultsNumber';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';

/* const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
*/

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const KEY = '572588f4';
/* const m_id = "tt1375666";
 */
export default function App() {
	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	/*
  //just trial ...
  useEffect(() => {
    console.log("Initial render only");
  }, []);

  useEffect(() => {
    console.log("After every render");
  });

  console.log("During");

  useEffect(() => {
    console.log("D");
  }, [query]);
 */
	//method handle to delete a movie to watched list

	const handleDeleteWatched = (id) => {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	};

	//method handle to add a movie to watched list
	const handleAddWatched = (movie) => {
		setWatched((watched) => [...watched, movie]);
	};

	//method which get movie id to display its details on right box
	const handleSelectedMovie = (id) => {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	};

	const handleClosedMovie = () => {
		setSelectedId(null);
	};

	//fetching data
	useEffect(() => {
		const controller = new AbortController();
		const fetchMovies = async (temp_query = 'interstellar') => {
			//add cleanup to remove the requests that we'll never need from network to avoid slow of fetching
			try {
				setIsLoading(true);
				setError('');
				const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
					signal: controller.signal,
				});

				const data = await res.json();
				if (!res.ok) throw new Error('Internet connection lost');

				if (data.Response === 'False') throw new Error('Movie not found');
				//console.log(data.Search);
				setMovies(data.Search);
				setIsLoading(false);
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err.message);
				}
				/* console.log(err); */
			} finally {
				setIsLoading(false);
			}
		};

		//handling empty search bar case to avoid "this movie not found error"
		if (!query.length) {
			setMovies([]);
			setError('');
			return;
		}
		//closing movie details when remove the name from search
		/* handleClosedMovie(); */
		fetchMovies();
		//cleanup method
		return function () {
			controller.abort();
		};
	}, [query]);

	return (
		<>
			{/* Nav Bar content */}

			<NavBar>{/* <MoviesResultsNumber movies={movies} /> */}</NavBar>

			{/* Main page content */}
			<Main>
				<Box>
					<div className='box__heading'>
						{/* fix prop drilling with component composition */}
						<Search query={query} setQuery={setQuery} />
						{/* fix prop drilling with component composition */}
					</div>
					{isLoading && <Loader />}
					{!isLoading && !error && <MoviesList movies={movies} onSelect={handleSelectedMovie} />}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							handleClosedMovie={handleClosedMovie}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<div className='box__heading'>
								<WatchedSummary watched={watched} />
							</div>
							<WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

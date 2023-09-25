import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
const KEY = "572588f4";

const MovieDetails = ({
  selectedId,
  handleClosedMovie,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  /* console.log(isWatched); */

  const watchUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  //destructuring...
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Director: director,
    Released: released,
    Genre: genre,
    Actors: actors,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split("").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    handleClosedMovie();
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );

      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };

    getMovieDetails();
  }, [selectedId]);

  //this effect to change the webpage title while clicking on a movie
  useEffect(() => {
    //to avoid undefined
    if (!title) return;
    document.title = `Movie | ${title}`;

    //return a cleanup function to remove the movie title when exit movie details
    //run after a component unmounted...
    //it may remember a movie name cause of closure property in JS...
    return function () {
      document.title = "Movies Popcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClosedMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p> {genre} </p>
              <p>
                <span>🌟</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to Watching List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  <em>
                    you already rated this movie with {watchUserRating} ⭐
                  </em>
                </p>
              )}
            </div>
            <p>
              <em> {plot} </em>
            </p>
            <p> Starring {actors} </p>
            <p> Directed by {director} </p>
          </section>
        </>
      )}
    </div>
  );
};
export default MovieDetails;

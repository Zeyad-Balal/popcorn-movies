//WatchedMoviesList's component
const WatchedMovie = ({ movie, onDeleteWatched }) => {
	return (
		<li>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<div>
				<h3>{movie.title}</h3>
				<p>
					⭐️ {movie.imdbRating} 🌟 {movie.userRating} ⏳ {movie.runtime} min
				</p>
				<button className='btn-delete' onClick={() => onDeleteWatched(movie.imdbID)}>
					X
				</button>
			</div>
		</li>
	);
};
export default WatchedMovie;

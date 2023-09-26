//MoviesList's component
const Movie = ({ movie, onSelect }) => {
	return (
		<li onClick={() => onSelect(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<div>
				<h3>{movie.Title}</h3>
				<p>
					<span>🗓️ {movie.Year}</span>
				</p>
			</div>
		</li>
	);
};
export default Movie;

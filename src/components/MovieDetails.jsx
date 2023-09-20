const MovieDetails = ({ selectedId, handleClosedMovie }) => {
  return (
    <div className="details">
      {selectedId}
      <button className="btn-back" onClick={handleClosedMovie}>
        &larr;
      </button>
      ;
    </div>
  );
};
export default MovieDetails;

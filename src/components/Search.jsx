/* import { useState } from "react"; */
//NavBar's component
const Search = ({ query, setQuery }) => {
  /* 
  const [query, setQuery] = useState("");
   */
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
export default Search;

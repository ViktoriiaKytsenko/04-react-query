import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { MovieModal } from "../../components/MovieModal/MovieModal";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      const results = await fetchMovies(query);
      if (results.results.length === 0) {
        toast("No movies found for your request.");
      }
      setMovies(results.results);
    } catch (error) {
      console.error("Помилка під час пошуку фільмів:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {" "}
      <Toaster /> <SearchBar onSubmit={handleSearch} /> {loading && <Loader />}{" "}
      {error && <ErrorMessage />}{" "}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}{" "}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}{" "}
    </>
  );
}
export default App;

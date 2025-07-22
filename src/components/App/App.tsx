import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { MovieModal } from "../../components/MovieModal/MovieModal";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import ReactPaginate from "react-paginate";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import styles from "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");

  const handleSearch = async (searchQuery: string, newPage: number = 1) => {
    setLoading(true);
    setError(false);
    setQuery(searchQuery);
    try {
      const results = await fetchMovies(searchQuery, newPage);
      if (results.results.length === 0) {
        toast("No movies found for your request.");
      }
      setMovies(results.results);
      setTotalPages(results.total_pages);
      setPage(newPage);
    } catch (error) {
      console.error("Помилка під час пошуку фільмів:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setPage(newPage);
    handleSearch(query, newPage);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={(query) => handleSearch(query)} />
      {loading && <Loader />}
      {error && <ErrorMessage />}

      {!loading && !error && movies.length > 0 && (
        <>
          {/* ПАГІНАЦІЯ ВГОРІ */}
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              previousLabel="←"
              nextLabel="→"
            />
          )}

          <MovieGrid
            movies={movies}
            onSelect={(movie) => setSelectedMovie(movie)}
          />

          {/* ПАГІНАЦІЯ ВНИЗУ */}
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              previousLabel="←"
              nextLabel="→"
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;

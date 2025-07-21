import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface Props {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export const MovieGrid = ({ movies, onSelect }: Props) => {
  return (
    <ul className={styles.grid}>
      {movies.map((movie: Movie) => (
        <li key={movie.id}>
          <div className={styles.card} onClick={() => onSelect(movie)}>
            <img
              className={styles.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/fallback.jpg"
              }
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

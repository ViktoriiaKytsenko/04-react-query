import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    Accept: "application/json",
  },
};

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse> => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    ...options,
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  });
  return response.data;
};

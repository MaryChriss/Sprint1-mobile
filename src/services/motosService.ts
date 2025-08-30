import axios from "axios";

const API_URL = "localhost:8080";

export const getMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Método para excluir um filme
export const deleteMovie = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Método para criar um novo filme
export const addMovie = async (movie: string) => {
  const response = await axios.post(API_URL, movie);
  return response.data;
};

// Método para atualizar um filme
export const updateMovie = async (id: string, movie: string) => {
  const response = await axios.put(`${API_URL}/${id}`, movie);
  return response.data;
};

// Método para recuperar o trailer de um filme
export const getTrailerUrl = async (title: string) => {
  const response = await axios.get(API_URL);
  return response.data.trailerUrl;
};

import axios from "axios";
import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";

type CadastroPayload = {
  nomeUser: string;
  phone: string; // telefone como string (mantém zeros e DDI)
  email: string;
  password: string;
};

export const getMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const cadastro = async (payload: CadastroPayload) => {
  const response = await axios.post(`${API_URL}/users`, payload, {
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
  });
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

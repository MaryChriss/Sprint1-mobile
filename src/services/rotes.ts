import { api } from "./api";

type CadastroPayload = {
  nomeUser: string;
  phone: number;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type PatioPayload = {
  nome: string;
  quantidadeVagas: number;
  metragemZonaA: number;
  metragemZonaB: number;
};

export type Patio = {
  id: number;
  nome: string;
  quantidadeVagas: number;
  metragemZonaA: number;
  metragemZonaB: number;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post("/login", payload);
  return data;
};

export const cadastro = async (payload: CadastroPayload) => {
  const { data } = await api.post("/users", payload);
  return data;
};

export const listPatios = async () => {
  const response = await api.get(`/patios`, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const listMotos = async () => {
  const response = await api.get(`/motos`);
  return response.data;
};

export const infospatios = async (patioId: number) => {
  const response = await api.get(`/patios/${patioId}/ocupacao`, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const buscarMotosNoPatio = async (
  patioId: number,
  params: { placa?: string; tipoZona?: "A" | "B" }
) => {
  const { data } = await api.get(`/motos/search/${patioId}`, { params });
  return data;
};

export const postPatio = async (payload: PatioPayload) => {
  const { data } = await api.post("/patios", payload);
  return data;
};

export const putPatio = async (id: number, payload: PatioPayload) => {
  const { data } = await api.put(`/patios/${id}`, payload);
  return data;
};

export const deletePatio = async (id: number) => {
  await api.delete(`/patios/${id}`);
};

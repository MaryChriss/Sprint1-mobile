import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";
import { resetToLogin } from "./RootNavigation";

let redirecting = false;

const PUBLIC_PATHS: RegExp[] = [/\/login$/, /\/users$/];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || "";
    const isPublic = PUBLIC_PATHS.some((re) => re.test(url));

    if (status === 401 && !isPublic) {
      try {
        await AsyncStorage.multiRemove(["token", "userData"]);
      } catch {}
      if (!redirecting) {
        redirecting = true;
        setTimeout(() => {
          resetToLogin();
          redirecting = false;
        }, 0);
      }
    }
    return Promise.reject(error);
  }
);

type CadastroPayload = {
  nomeUser?: string;
  phone?: number;
  email?: string;
  password?: string;
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

export const putUser = async (id: number, payload: CadastroPayload) => {
  const { data } = await api.put(`/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
};

export const getUser = async (id: number) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

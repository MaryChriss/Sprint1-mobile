import { api } from "./api";

type CadastroPayload = {
  nomeUser: string;
  phone: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

export const login = async (payload: LoginPayload) => {
  const response = await api.post(`/login`, payload,  {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
};

export const cadastro = async (payload: CadastroPayload) => {
  const response = await api.post(`$/users`, payload, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
};

export const listPatios = async () => {
  const response = await api.get(`/patios`,  {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
};

export const infospatios = async (patioId: number) => {
  const response = await api.get(`/patios/${patioId}/ocupacao`, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
}


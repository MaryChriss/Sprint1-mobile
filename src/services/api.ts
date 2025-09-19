import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const PUBLIC_PATHS = [/^\/login$/, /^\/users(\/.*)?$/];

api.interceptors.request.use(async (config) => {
  const url = config.url || "";
  const isPublic = PUBLIC_PATHS.some((re) => re.test(url));

  if (isPublic) return config;

  const hasAuthHeader =
    !!config.headers &&
    Object.prototype.hasOwnProperty.call(config.headers, "Authorization");
  if (hasAuthHeader) return config;

  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

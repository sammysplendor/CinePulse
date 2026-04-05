import axios from "axios";
import { BASE_URL } from "../constants/config";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

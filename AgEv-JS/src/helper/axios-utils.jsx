import axios from "axios";

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const request = async ({ ...options }) => {
  const res = await client(options);
  return res;
};

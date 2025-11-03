import axios from "axios";

const apiBase = axios.create({
  baseURL: "https://meuservidorubuntu.com.br/users",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiBase;

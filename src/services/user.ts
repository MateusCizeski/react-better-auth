import api from "@/api/api";
import apiBase from "@/api/apiBase";

class User {
  async login(email: string, password: string) {
    const response = await apiBase({
      method: "PUT",
      url: "/api/v1/users/login",
      data: JSON.stringify({ Email: email, Password: password }),
    });

    return response.data;
  }

  async newUser(name: string, userName: string, email: string, password: string) {
    const response = await apiBase({
      method: "POST",
      url: "/api/v1/users",
      data: JSON.stringify({ Name: name, UserName: userName, Email: email, Password: password }),
    });

    return response.data;
  }

  async updateUser(id: string, name: string) {
    const response = await api({
      method: "PUT",
      url: `/api/v1/users/${id}`,
      data: JSON.stringify({ Name: name }),
    });

    return response.data;
  }

  async refresh() {
    const response = await api({
      method: "POST",
      url: "/api/v1/users/refresh",
      withCredentials: true
    });

    return response.data;
  }
}

export default new User();

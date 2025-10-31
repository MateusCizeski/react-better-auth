import apiBase from "@/api/apiBase";
import api from "@/api/api";

class User {
  async login(email: string, password: string) {
    const response = await apiBase({
      method: "POST",
      url: "api/v1/users",
      data: JSON.stringify({ Email: email, Password: password }),
    });

    return response.data;
  }

  async newUser() {}

  async updateUser() {}

  async refresh() {}

  async logout() {}
}

export default new User();

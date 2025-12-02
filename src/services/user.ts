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

  async updateUser(id: string) {
    const response = await apiBase({
      method: "PUT",
      url: `/api/v1/users/${id}`,
    });

    return response.data;
  }

  async refresh() {}

  async logout() {}
}

export default new User();

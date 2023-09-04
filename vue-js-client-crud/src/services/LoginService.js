import http from "../http-common";

class LoginService {
  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  post(data) {
    return http.post("/auth/user", data);
  }

  put(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }


}

export default new LoginService();
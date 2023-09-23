import http from "../http-common";

class EmpService {
  get(empworknumber) {
    return http.get(`/api/Emp?EmpWorkNumber=${empworknumber}`, {
      headers: {Authorization: "Bearer " + localStorage.getItem("token")}
    });
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

export default new EmpService();
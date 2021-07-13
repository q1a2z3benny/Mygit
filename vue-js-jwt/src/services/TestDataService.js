import http from "../http-common";

class TestDataService {
  roleuser(token) {
    return http.get("/test/user",{ headers: {'x-access-token': token}})
  }
  roleall() {
    return http.get("/test/all")
  } 
  }
  export default new TestDataService();
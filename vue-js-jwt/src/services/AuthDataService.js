import http from "../http-common";

class AuthDataService {
    signUp(userdata) {
        return http.post("/auth/signup",userdata)
    }
    signIn(userdata) {
        return http.post("/auth/signin",userdata)
    }
    refreshToken(data) {
        return http.post("/auth/refreshtoken",data)
    }
  }
  export default new AuthDataService();
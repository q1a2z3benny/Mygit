import axios from "axios";

export default axios.create({
  /*baseURL: "http://localhost:8080/api",*/
  baseURL:"http://192.168.0.83:3045",
  headers: {
    "Content-type": "application/json"
  }
});
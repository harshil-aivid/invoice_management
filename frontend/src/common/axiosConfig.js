import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "http://localhost:4000",
});

// Where you would set stuff like your 'Authorization' header, etc ...
AxiosConfig.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM AxiosConfig";
AxiosConfig.defaults.headers.post["Content-Type"] = "application/json";
// Also add/ configure interceptors && all the other cool stuff

AxiosConfig.interceptors.request.use(
  (request) => {
    console.log(request);
    if (!request.headers.Authorization) {
      const token = JSON.parse(localStorage.getItem("keyCloak"));
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

AxiosConfig.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default AxiosConfig;

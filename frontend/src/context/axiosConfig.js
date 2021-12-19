import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";
instance.defaults.headers.post["Content-Type"] = "application/json";
// Also add/ configure interceptors && all the other cool stuff

instance.interceptors.request.use(
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

instance.interceptors.response.use(
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

export default instance;


import axios from "axios";
export const $axios = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});
$axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
$axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    const requestUrl: string = original.url || "";

    const isAuthEndpoint =
    requestUrl.includes("/admin/login") ||
    requestUrl.includes("/admin/verify-otp") ||
    requestUrl.includes("/admin/refresh") ||
    requestUrl.includes("/admin/request-reset") ||
    requestUrl.includes("/admin/reset-password");

    if (error.response?.status === 401 && !original._retry && !isAuthEndpoint) {
      original._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:5000/api/admin/refresh",
          {},
          { withCredentials: true }
        );
        sessionStorage.setItem("token", res.data.accessToken);
        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return $axios(original);
      } catch {
        sessionStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);








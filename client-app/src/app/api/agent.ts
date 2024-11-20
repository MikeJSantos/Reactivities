import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/routes";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        toast.error("Bad request");
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 403:
        toast.error("Forbidden");
        break;
      case 404:
        // toast.error("Not found");
        router.navigate("/not-found");
        break;
      case 500:
        toast.error("Server error");
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};
const baseUrl = "/activities";
const getUrl = (id: string) => `${baseUrl}/${id}`;
const Activities = {
  list: () => requests.get<Activity[]>(baseUrl),
  details: (id: string) => requests.get<Activity>(getUrl(id)),
  create: (activity: Activity) => axios.post(baseUrl, activity),
  update: (activity: Activity) => axios.put(getUrl(activity.id), activity),
  delete: (id: string) => axios.delete(getUrl(id)),
};
const agent = { Activities };

export default agent;

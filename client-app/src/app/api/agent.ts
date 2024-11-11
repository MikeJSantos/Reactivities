import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

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

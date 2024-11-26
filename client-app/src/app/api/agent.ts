import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/routes";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "http://localhost:5000/api";

function badRequest(data: any, method: string | undefined) {
  const errors = data.errors;
  if (method === "get" && Object.prototype.hasOwnProperty.call(errors, "id")) {
    router.navigate("/not-found");
  }
  if (errors) {
    const modalStateErrors = [];
    for (const key in errors) {
      const error = errors[key];
      if (error) modalStateErrors.push(error);
    }
    throw modalStateErrors.flat();
  } else {
    toast.error(data);
  }
}

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        badRequest(data, config.method);
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 403:
        toast.error("Forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.SetServerError(data);
        router.navigate("/server-error");
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
const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};
const agent = { Activities, Account };

export default agent;

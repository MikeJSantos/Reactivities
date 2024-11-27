import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  private readonly jwt = "jwt";
  error: ServerError | null = null;
  token: string | null = localStorage.getItem(this.jwt);
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) localStorage.setItem(this.jwt, token);
        else localStorage.removeItem(this.jwt);
      }
    );
  }

  setServerError(error: ServerError) {
    this.error = error;
  }

  setToken = (token: string | null) => {
    if (token) localStorage.setItem(this.jwt, token);
    this.token = token;
  };

  setAppLoaded = () => (this.appLoaded = true);
}

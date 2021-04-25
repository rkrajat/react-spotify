import { Cookies } from "react-cookie";
import { AppErrors, IAjaxPayload } from "./types";

class HttpService {
  private tracker: string[] = [];
  private abortControllers: { [key: string]: AbortController } = {};

  constructor(private host: string) {}

  private preventDuplicates(url: string) {
    if (this.tracker.indexOf(url) !== -1) return;
    this.tracker.push(url);
  }

  private abortPrevious(url: string, controller: AbortController) {
    if (this.abortControllers[url]) this.abortControllers[url].abort();
    this.abortControllers[url] = controller;
  }

  request(url: string, method = "GET", config: IAjaxPayload) {
    const controller = new AbortController();
    const cookies = new Cookies();
    const authCookie = cookies.get(import.meta.env.VITE_COOKIE_HASH as string);
    const { data, preventDuplicates, abortPrevious } = config;
    const options: RequestInit = {
      method,
      signal: controller.signal,
      mode: "cors",
    };

    if (preventDuplicates) this.preventDuplicates(url);
    if (abortPrevious) this.abortPrevious(url, controller);

    if (authCookie !== undefined) {
      options.headers = new Headers();
      options.headers.append("Authorization", `Bearer ${authCookie}`);
    }
    if (data) {
      if (method === "GET") {
        const dataObject: { [key: string]: string } = {};
        data.forEach((v: string, k: string) => {
          dataObject[encodeURIComponent(k)] = encodeURIComponent(v);
        });
        url = url + "?" + new URLSearchParams(Object.entries(dataObject));
      } else if (method === "POST") {
        options.body = JSON.stringify(data);
      }
    }

    return fetch(this.host + "/" + url, options)
      .then((response) => {
        if (!config.raw && response.status === 401) {
          throw new Error(AppErrors.AuthError);
        } else if (!config.raw && response.status === 404) {
          throw new Error(AppErrors.NotFound);
        } else if (!config.raw && response.status !== 200) {
          throw new Error(AppErrors.ApiError);
        }
        return response;
      })
      .then((response) => {
        if (config.preventDuplicates && this.tracker.indexOf(url) !== -1) {
          this.tracker.splice(this.tracker.indexOf(url), 1);
        }
        if (response.type !== "basic") config.raw = true;
        return response.json();
      })
      .catch((error) => {
        if (config.onAbort) {
          config.onAbort(error as unknown);
        } else {
          // Internal server error (500)
          if (error.message === "Failed to fetch") {
            throw new Error(AppErrors.ApiError);
            // all other errors
          } else {
            throw new Error(error.message);
          }
        }
      });
  }
}

export default new HttpService(import.meta.env.VITE_API_HOST as string);

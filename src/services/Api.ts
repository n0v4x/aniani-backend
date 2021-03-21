import axios, { AxiosRequestConfig } from "axios";

export class ApiError extends Error {
  public source: string;

  constructor(message: string, source?: string) {
    super(message);

    this.source = source;
    this.name = "ApiError";
  }
}

export default abstract class Api {
  protected async _fetch<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    const { data } = await axios.get(url, options);

    return data;
  }
}

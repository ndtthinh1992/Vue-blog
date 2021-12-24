import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_API_URL } from "@/constant/systems";
import IHttpClient from "./IHttpClient";

declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {
    extend: any;
  }
}

abstract class HttpClient implements IHttpClient {
  private readonly instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      baseURL: BASE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.instance
        .get<T, AxiosResponse<T>>(url, config)
        .then(resolve)
        .catch(reject);
    });
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.instance
        .post<T, AxiosResponse<T>>(url, data, config)
        .then(resolve)
        .catch(reject);
    });
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.instance.put<T>(url, data, config).then(resolve).catch(reject);
    });
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.instance.delete<T>(url, config).then(resolve).catch(reject);
    });
  }
}

export default HttpClient;

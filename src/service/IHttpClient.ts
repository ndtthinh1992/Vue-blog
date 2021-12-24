import { AxiosRequestConfig } from "axios";

interface HttpClient {
  get<T>(url: string, config?: AxiosRequestConfig | undefined): Promise<T>;
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<T>;
  put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig | undefined): Promise<T>;
}

export default HttpClient;

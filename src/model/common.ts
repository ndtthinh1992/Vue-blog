export interface Response<T = any> {
  status: number;
  statusText: string;
  data: T;
}
export interface ParamsRequest {
  page: number;
  limit: number;
  order: string;
  sortBy?: string;
  search?: string;
  filter?: string;
  title?: string;
}

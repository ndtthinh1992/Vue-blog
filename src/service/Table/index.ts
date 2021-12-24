import { Response, ParamsRequest } from "@/model/common";
import ITable from "@/service/Table/ITable";
import HttpClient from "@/service/HttpClient";

export default class Table extends HttpClient implements ITable {
  public getDataByUrl(url:string, params: ParamsRequest): Promise<Response<any>> {
    return this.get<Response<any>>(url, {params});
  }
}

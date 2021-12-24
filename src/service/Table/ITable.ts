import { Response, ParamsRequest } from "@/model/common";

interface Table {
  getDataByUrl(url: string, params: ParamsRequest): Promise<Response<any>>;
}
export default Table;

import { Response, ParamsRequest } from "@/model/common";
import { ResponseArticle, RequestArticle } from "@/model/Article";
import IBlog from "@/service/Blog/IBlog";
import HttpClient from "@/service/HttpClient";

export default class Blog extends HttpClient implements IBlog {
  public getArticleDetail(id: string): Promise<Response<ResponseArticle>> {
    return this.get<Response<ResponseArticle>>(`/blogs/${id}`);
  }
  public getListArticles(
    params: ParamsRequest
  ): Promise<Response<ResponseArticle[]>> {
    return this.get<Response<ResponseArticle[]>>(`/blogs`, { params });
  }
  public searchArticles(
    search: string
  ): Promise<Response<ResponseArticle[]>> {
    return this.get<Response<ResponseArticle[]>>(`/blogs`, { params:{search} });
  }
  public addArticle(
    article: RequestArticle
  ): Promise<Response<RequestArticle>> {
    return this.post<Response<RequestArticle>>(`/blogs`, article);
  }
  public editArticle(
    id: string,
    article: RequestArticle
  ): Promise<Response<ResponseArticle>> {
    return this.put<Response<ResponseArticle>>(`/blogs/${id}`, article);
  }
}

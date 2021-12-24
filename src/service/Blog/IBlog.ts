import { Response, ParamsRequest } from "@/model/common";
import { ResponseArticle, RequestArticle } from "@/model/Article";

interface Blog {
  getArticleDetail(id: string): Promise<Response<ResponseArticle>>;
  getListArticles(params: ParamsRequest): Promise<Response<ResponseArticle[]>>;
  searchArticles(search: string): Promise<Response<ResponseArticle[]>>;
  addArticle(article: RequestArticle): Promise<Response<RequestArticle>>;
  editArticle(
    id: string,
    article: RequestArticle
  ): Promise<Response<ResponseArticle>>;
}
export default Blog;

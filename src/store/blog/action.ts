import blog from "@/service/Blog";
import { ResponseArticle, RequestArticle } from "@/model/Article";
import { Response, ParamsRequest } from "@/model/common";

const serviceBlog = new blog();
const actions = {
  getDetailById({ commit }: { commit: any }, id: string) {
    return new Promise(function (resolve, reject) {
      serviceBlog
        .getArticleDetail(id)
        .then(function (result) {
          if (result.status >= 200 && result.status < 300) {
            commit("getDetailById", result);
            resolve(result);
          } else {
            reject(result);
          }
        })
        .catch(function (err) {
          reject(err);
        });
    });
  },
  getListArticles({ commit }: { commit: any }, params: ParamsRequest) {
    return new Promise(function (resolve, reject) {
      serviceBlog
        .getListArticles(params)
        .then(function (result) {
          if (result.status >= 200 && result.status < 300) {
            commit("getListArticle", result);
            resolve(result);
          } else {
            reject(result);
          }
        })
        .catch(function (err) {
          reject(err);
        });
    });
  },
  searchArticles({ commit }: { commit: any }, params: string) {
    return new Promise(function (resolve, reject) {
      serviceBlog
        .searchArticles(params)
        .then(function (result) {
          if (result.status >= 200 && result.status < 300) {
            commit("getListArticle", result);
            resolve(result);
          } else {
            reject(result);
          }
        })
        .catch(function (err) {
          reject(err);
        });
    });
  },
};
const mutations = {
  getDetailById(state: any, resultDetail: Response<ResponseArticle>) {
    state.article = resultDetail.data;
  },
  getListArticle(state:any, resultDetail: Response<ResponseArticle[]>) {
    state.listArticle = resultDetail.data;
  }
};

export { actions, mutations };

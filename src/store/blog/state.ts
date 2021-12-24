import { ResponseArticle } from "@/model/Article";
const state = {
  article: {
    id: "50",
    createdAt: "",
    content: "",
    image: "",
    title: "",
  } as ResponseArticle,
  listArticle: [
    {
      id: "50",
      createdAt: "",
      content: "",
      image: "",
      title: "",
    },
  ] as ResponseArticle[],
};
const getters = {
  getArticle: (state: any): ResponseArticle => {
    return state.article;
  },
  getListArticle: (state: any): ResponseArticle[] => {
    return state.listArticle;
  },
};

export { state, getters };

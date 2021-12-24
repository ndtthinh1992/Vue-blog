export interface ResponseArticle {
  createdAt: string;
  title: string;
  image?: string;
  content: string;
  id: string;
}
export interface RequestArticle {
  title: string;
  content: string;
}

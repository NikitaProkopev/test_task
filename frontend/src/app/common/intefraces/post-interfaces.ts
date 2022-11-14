export interface Post {
  id: number,
  title: string,
  description?: string,
  createDate: string,
  categories: string | string[],
  author: string
  text?: string,
  img?: string
}

export interface PostListSettings{
  page: number;
  perPage: number;
  orderFieldName?: string;
  orderTypeName?: string;
  filter: Partial<Post>
}

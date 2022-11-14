import {gql} from "apollo-angular";

const GET_POSTS = gql`
  query posts($page: Int!, $perPage: Int!, $orderFieldName: String, $orderTypeName: String, $filter: Filter!) {
    posts(page: $page, perPage: $perPage, orderFieldName: $orderFieldName, orderTypeName: $orderTypeName, filter: $filter) {
      id,
      title,
      description,
      createDate,
      author,
      categories,
    }
  }
`;

const GET_POST = gql`
  query post($id: Int!) {
    post(id: $id) {
      id,
      title,
      img,
      text,
      createDate,
      author,
      categories,
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($id: Int!, $title: String!, $text: String!,
    $img: String!, $createDate: String!, $author: String!, $categories: [String]!) {
      updatePost(id: $id, title: $title, text: $text, img: $img,
      createDate: $createDate, author: $author, categories: $categories)
  }
`;

const CREATE_POST = gql`
  mutation createPost($title: String!, $text: String!,
    $img: String!, $createDate: String!, $author: String!, $categories: [String]!) {
      createPost(title: $title, text: $text, img: $img,
      createDate: $createDate, author: $author, categories: $categories)
  }
`;

const GET_POST_PAGES_COUNT = gql`
  query getPagesCount($perPage: Int!, $filter: Filter) {
    getPagesCount(perPage: $perPage, filter: $filter)
  }
`;

const typeDefs = gql`
  extend type Filter {
    id: Int,
    title: String,
    description: String,
    createDate: String,
    author: String,
    categories: [String]
  }
`

export {
  GET_POST,
  GET_POSTS,
  GET_POST_PAGES_COUNT,
  UPDATE_POST,
  CREATE_POST,
  typeDefs
}

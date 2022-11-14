import {gql} from "apollo-angular";

const GET_CATEGORIES = gql`
  query categories($name: String!, $notInclude: [String]!) {
    categories(name: $name, notInclude: $notInclude) {
      id,
      name
    }
  }
`;

export {GET_CATEGORIES}

import {gql} from "apollo-angular";

const GET_USER = gql`
  query login($login: String!, $password: String!){
  login(login: $login, password: $password) {
    login,
    password
  }
}
`

export { GET_USER }

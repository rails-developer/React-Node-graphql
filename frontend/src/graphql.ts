import gql from 'graphql-tag';

export const GET_DATAS = gql`
  query getDatas($page: Int, $searchByName: String) {
    body(page: $page, searchByName: $searchByName) {
      count
      next
      results {
        name
        height
        mass
        gender
        homeworld
      }
      previous
    }
  }
`;

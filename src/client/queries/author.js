import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

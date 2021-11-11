import gql from "graphql-tag";

export const GET_PROFILE= gql`
{
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;
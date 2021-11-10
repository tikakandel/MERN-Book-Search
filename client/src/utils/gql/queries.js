import gql from "graphql-tag";

export const GET_PROFILE = gql`
{
    user {
      _id
      username
      email
      bookCount
      savedBooks {
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
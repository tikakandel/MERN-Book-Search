import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: bookInput!) {
    saveBook(input: $input) {
      _id
      username
      email
      savedBooks {
        _id
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const NEW_USER = gql`

	mutation ($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			user {
				username
				email
			}
			token
		}
	}
`;
// export const NEW_USER = gql`
//   mutation addUser($username: String!, $password: String!, $email: String!) {
//     addUser(username: $username, password: $password, email: $email) {
//       user {
//         _id
//         username
//         email
//         bookCount
//         savedBooks {
//           authors
//           bookId
//           image
//           link
//           title
//           description
//         }
//       }
//       token
//     }
//   }
// `;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
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

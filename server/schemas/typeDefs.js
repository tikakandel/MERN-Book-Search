const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
 
}
type Auth {
  token: ID!
  user: User
}
input bookInput {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
}

type Book {
  _id: ID!
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
}


 

 type Query {
    users: [User]!
    user: User
  }

  type Mutation
  {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeBook(bookId: String!): User
    saveBook(input: bookInput!): User

  
  }`;
  module.exports = typeDefs;
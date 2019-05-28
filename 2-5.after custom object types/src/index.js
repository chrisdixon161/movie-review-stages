const { GraphQLServer } = require('graphql-yoga')
const { users, movies, reviews } = require('./sampleData')

// Scalar types: String, Int, Float, Boolean, ID
const typeDefs = `
  type Query {
    movie(id: ID!, title: String!): Movie!
    user(id: ID!, name: String!, email: String!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
  
  type Movie {
    id: ID!
    title: String!
  }
`
const resolvers = {
  Query: {
    movie(parent, args, ctx, info) {
      const movie = {
        id: args.id,
        title: args.title
      }
      return movie
    },
    user(parent, args, ctx, info) {
      // create uer object based on args:
      const user = {
        id: args.id,
        name: args.name,
        email: args.email
      }
      return user
    }
  }
}

const server = new GraphQLServer({ 
  typeDefs, 
  resolvers,
  context: {
    users,
    movies, 
    reviews
  }
})

server.start(() => console.log('Server is running on localhost:4000'))
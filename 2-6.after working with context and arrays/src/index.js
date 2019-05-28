const { GraphQLServer } = require('graphql-yoga')
const { users, movies, reviews } = require('./sampleData')

// Scalar types: String, Int, Float, Boolean, ID
const typeDefs = `
  type Query {
    movie(id: ID!, title: String!): Movie!
    movies: [Movie!]!
    users: [User!]!
    reviews: [Review]!
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

  type Review {
    id: ID!
    movie: String!
    reviewText: String!
    rating: Int!
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
    movies(parent, args, ctx, info){
      return ctx.movies
    },
    users(parent, args, ctx, info) {  
      return ctx.users
    },
    reviews(parent, args, ctx, info){
      return ctx.reviews
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
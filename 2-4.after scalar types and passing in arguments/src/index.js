const { GraphQLServer } = require('graphql-yoga')
const { users, movies, reviews } = require('./sampleData')

// Scalar types: String, Int, Float, Boolean, ID
const typeDefs = `
  type Query {
    movie(title: String!): String!
    user(id: ID!, name: String!, email: String!): String!
  }
`
const resolvers = {
  Query: {
    movie(parent, args, ctx, info) {
      if(args.title){
        return `My favorite movie is ${args.title}`
      }
      return 'Please enter your favorite movie...'
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
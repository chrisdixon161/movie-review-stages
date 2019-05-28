const { GraphQLServer } = require('graphql-yoga')
const { users, movies, reviews } = require('./sampleData')

const typeDefs = `
  type Query {
    movie: String!
    user: String!
  }
`
const resolvers = {
  Query: {
    movie() {
      return 'The Lego Movie'
    },
    user() {
      return 'Chris Dixon'
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
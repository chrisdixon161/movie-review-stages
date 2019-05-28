const { GraphQLServer } = require('graphql-yoga')
const { users, movies, reviews } = require('./sampleData')

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log('Server is running on localhost:4000'))
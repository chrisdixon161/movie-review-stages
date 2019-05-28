const { GraphQLServer, PubSub } = require('graphql-yoga')
const { prisma } = require('../prisma/generated/prisma-client')
const { users, movies, reviews } = require('./sampleData')

const resolvers = require('./resolvers')

const pubsub = new PubSub()

const server = new GraphQLServer({ 
  typeDefs: './src/schema.graphql', 
  resolvers,
  context: {
    users,
    movies, 
    reviews,
    prisma
  }
})

server.start(() => console.log('Server is running on localhost:4000'))
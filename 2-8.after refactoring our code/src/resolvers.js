const resolvers = {
  Query: {
    movies(parent, args, ctx, info) {
      return ctx.movies
    },
    users(parent, args, ctx, info) {
      return ctx.users
    },
    reviews(parent, args, ctx, info) {
      return ctx.reviews
    }
  }
}

module.exports = resolvers
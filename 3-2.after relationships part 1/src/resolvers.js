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
  },
  Review: {
    movie(parent, args, ctx, info){
      return ctx.movies.find(movie => {
        return movie.id === parent.movie
      })
    },
    user(parent, args, ctx, info){
      return ctx.users.find(user => {
        return user.id === parent.user
      })
    }
  }
}

module.exports = resolvers
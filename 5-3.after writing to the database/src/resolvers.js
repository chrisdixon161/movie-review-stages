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
  Mutation: {
    async signup(parent, args, ctx, info) {
      const user = await ctx.prisma.createUser({
        name: args.name,
        email: args.email
      })
      return user
    },
    async createMovie(parent, args, ctx, info){
      const movie = await ctx.prisma.createMovie({
        title: args.title
      })
      return movie
    },
    createReview(parent, args, ctx, info){
      const review = {
        id: `300${ctx.reviews.length +1}`,
        movie: args.movieId,
        reviewText: args.reviewText,
        rating: args.rating,
        user: args.userId
      }
      ctx.reviews.push(review)
      ctx.pubsub.publish('newReview', { review })
      return review
    }
  },
  Subscription: {
    review: {
      subscribe(parent, args, ctx, info) {
        return ctx.pubsub.asyncIterator('newReview')
      }
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
  },
  User: {
    reviews(parent, args, ctx, info) {
      return ctx.reviews.filter(review => {
        return review.user === parent.id
      })
    }
  },
  Movie: {
    reviews(parent, args, ctx, info) {
      return ctx.reviews.filter(review => {
        return review.id === parent.reviews
      })
    }
  }
}

module.exports = resolvers
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
    signup(parent, args, ctx, info) {
      const user = {
        id: `100${ctx.users.length +1}`,
        name: args.name,
        email: args.email
      }
      ctx.users.push(user)
      return user
    },
    createMovie(parent, args, ctx, info){
      const movie = {
        id: `200${ctx.movies.length +1}`,
        title: args.title
      }
      ctx.movies.push(movie)
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
      return review
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
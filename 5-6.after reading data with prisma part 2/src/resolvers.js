const resolvers = {
	Query: {
		async movies(parent, args, ctx, info) {
			// return ctx.movies
			const movies = await ctx.prisma.movies()
			return movies
		},
		async users(parent, args, ctx, info) {
			// return ctx.users
			const users = await ctx.prisma.users()
			return users
		},
		async reviews(parent, args, ctx, info) {
			const reviews = await ctx.prisma.reviews()
			return reviews
			// return ctx.reviews
		},
		async reviewsByUser(parent, args, ctx, info) {
			const userExists = await ctx.prisma.$exists.user({ id: args.userId })
			if (!userExists) {
				throw new Error('User not found')
			}
			const reviews = await ctx.prisma.user({ id: args.userId }).reviews()
			return reviews
		},
	},
	Mutation: {
		async signup(parent, args, ctx, info) {
			const user = await ctx.prisma.createUser({
				name: args.name,
				email: args.email,
			})
			return user
		},
		async createMovie(parent, args, ctx, info) {
			const movie = await ctx.prisma.createMovie({
				title: args.title,
			})
			return movie
		},
		async createReview(parent, args, ctx, info) {
			const user = ctx.prisma.$exists.user({ id: args.userId })
			const movie = ctx.prisma.$exists.movie({ id: args.movieId })

			if (!user) {
				throw new Error('User not found')
			}

			if (!movie) {
				throw new Error('Movie not found')
			}

			const review = await ctx.prisma.createReview({
				movie: {
					connect: {
						id: args.movieId,
					},
				},
				reviewText: args.reviewText,
				rating: args.rating,
				user: {
					connect: {
						id: args.userId,
					},
				},
			})

			ctx.pubsub.publish('newReview', { review })
			return review
		},
	},
	Subscription: {
		review: {
			subscribe(parent, args, ctx, info) {
				return ctx.pubsub.asyncIterator('newReview')
			},
		},
	},
	Review: {
		movie(parent, args, ctx, info) {
			return ctx.prisma.review({ id: parent.id }).movie()
		},
		user(parent, args, ctx, info) {
			return ctx.prisma.review({ id: parent.id }).user()
		},
	},
	User: {
		reviews(parent, args, ctx, info) {
			return ctx.prisma.user({ id: parent.id }).reviews()
			// return ctx.reviews.filter(review => {
			//   return review.user === parent.id
			// })
		},
	},
	Movie: {
		reviews(parent, args, ctx, info) {
			return ctx.prisma.movie({ id: parent.id }).reviews()
			// return ctx.reviews.filter(review => {
			//   return review.id === parent.reviews
			// })
		},
	},
}

module.exports = resolvers

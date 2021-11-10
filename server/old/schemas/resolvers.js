const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {

        //     user: async () => {
        //       return User.find();
        //     },
        
            user: async (parent, { userId }, context) => {
              
            return User.findOne({ _id: userId });
          },
                // By adding context to our query, we can retrieve the logged in user without specifically searching for them
            me: async (parent, args, context) => {
              if (context.user) {
                console.log(context.user);
                return User.findOne({ _id: context.user._id });
              }
              throw new AuthenticationError('You need to be logged in!');
            },
            
           
        // me: async (parent, { id, username }) => {
		// 	const foundUser = await User.findOne({
		// 		$or: [{ _id: id }, { username }],
		// 	});

		// 	if (!foundUser) {
		// 		throw new AuthenticationError(`Cannot find user`);
		// 	}

		// 	return foundUser;
		// },


    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
        
//  login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError('Incorrect credentials');
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError('Incorrect credentials');
//       }

//       const token = signToken(user);

//       return { token, user };
//     }

      
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
      
            return { token, user };
          },
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                console.log("save book for user:", context.user._id)
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        deleteBook: async (parent, { userID, bookId }) => {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: userID },
				{ $pull: { savedBooks: { bookId } } },
				{ new: true }
			);

			//return updated user
			return updatedUser;
		},
           
        }
    
};

module.exports = resolvers;
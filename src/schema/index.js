//* Import necessary GraphQL modules and dependencies.
import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';

//* Import data models for products and orders.
import  Product  from '../model/product.js';
import  Order  from '../model/order.js';

//* Import user-defined data types for GraphQL.
import ProductType from './typeDefs/ProductType.js';
import UserType from './typeDefs/UserType.js';
import OrderType from './typeDefs/OrderType.js';

// Define the RootQuery, which is the entry point for querying data.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Products Queries
    getAllProduct: {
      type: new GraphQLList(ProductType), // Define the type of data to be returned (a list of products).
      args: { id: { type: GraphQLString } }, // Specify any input arguments that can be used in the query (in this case, an 'id').
      async resolve(parent, args) {
        // The 'resolve' function specifies how to fetch and return the requested data.
        // In this case, it fetches and returns a list of all products.
        return await Product.find();
      },
    },
    getProduct: {
      type: ProductType, // Define the type of data to be returned (a single product).
      args: { id: { type: GraphQLString } }, // Specify an input argument 'id'.
      async resolve(parent, args) {
        // The 'resolve' function fetches and returns a specific product based on the provided 'id'.
        return await Product.findById(args.id);
      },
    },

    // Orders Queries
    getAllOrders: {
      type: new GraphQLList(OrderType), // Define the type of data to be returned (a list of orders).
      args: { id: { type: GraphQLString } }, // Specify an input argument 'id'.
      async resolve(parent, args, context) {
        // The 'resolve' function fetches and returns a list of orders for a specific user, but only if the user is authenticated.
        if (!context.isAuth) {
          throw new Error('Unauthenticated');
        }
        return await Order.find({ userId: args.id });
      },
    },
  },
});

// Export a GraphQLSchema that includes the RootQuery.
export default new GraphQLSchema({
  query: RootQuery,
});

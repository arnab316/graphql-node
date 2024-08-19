import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String!
     randomNubmer: Int!  
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    randomNubmer: () => Math.round(Math.random() * 10),
  },
};

const appServer = async () => {
  // MiddleWares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  // GraphQL Server
  const server = new ApolloServer({ typeDefs, resolvers });  // Corrected line
  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server),
  );

  // Server configuration
  const PORT = 4089;
  app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
  });
};

appServer();

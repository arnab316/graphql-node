import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import  {connect} from "./config/database.js";
import graphql from 'graphql'
import schema from './schema/index.js'
const app = express();

const appServer = async () => {
  // MiddleWares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  //*  GraphQL Server
  const server = new ApolloServer({ schema, graphiql: true, });  //! Corrected line
  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server),
  );


  //? Database Connection
   await  connect().then(()=> console.log('Database connection established'))
       .catch(()=> console.log('Database connection error'))
  // Server configuration
  const PORT = 4089;
  app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
  });
};

appServer();

// Packages

import { connect } from 'mongoose';
const { ApolloServer } = require('apollo-server');
require('dotenv').config();

// Database
connect(process.env.MONGODB_URI as string, {
  autoIndex: true,
})
  .then(() => {
    return console.log('Connected to MongoDB database...');
  })
  .catch((err) => console.log('Could not connect', err));

// typeDefs
const typeDefs = require('./graphql/schema/index');

// resolvers
const resolvers = require('./graphql/resolvers/index');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => {
  console.log(`🚀  Server ready at http://localhost:4000`);
});

const { createTestClient } = require('apollo-server-testing');
const createServer = require('../createApolloServer');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const LOADER_URI = process.env.MONGODB_URI;

describe('testApollo', () => {
  const server = createServer();
  const { query } = createTestClient(server);

  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(LOADER_URI);
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Connection  ', async () => {
    const GET_ExampleQuery = `
    query Query {
      getWilders {
        id
        name
      }
    }
  `;

    const response = await query({ query: GET_ExampleQuery });
    console.log(
      '🚀 ~ file: Server.integration.test.js ~ line 35 ~ it ~ response',
      response
    );
    expect(response.data).toBe({
      getWilders: [
        {
          name: 'Phillipe',
          id: '623f7612005b5ae9b67bfda1',
        },
        {
          name: 'Jean',
          id: '625537a5665c54851ba6fcc0',
        },
        {
          name: 'John',
          id: '736f6d652d757365722d6964',
        },
      ],
    });
  });
});

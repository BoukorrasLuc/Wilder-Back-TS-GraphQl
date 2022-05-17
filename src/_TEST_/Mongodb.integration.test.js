const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const LOADER_URI = process.env.MONGODB_URI;

describe.skip('MongoIntegrationTest', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(LOADER_URI);
    db = await connection.db();
    console.log(
      '🚀 ~ file: Mongodb.integration.test.js ~ line 12 ~ beforeAll ~ db',
      db
    );
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Connection  ', async () => {
    const wildersDb = await connection.db('wilders');
    console.log(wildersDb);
    const wilders = wildersDb.collection('wilders');
    console.log(wilders);
  });

  it('should insert a user into collection', async () => {
    const users = db.collection('wilders');

    const mockUser = {
      _id: 'some-user-id',
      name: 'John',
      city: 'Paris',
      skills: [
        {
          title: 'React',
          votes: 5,
        },
      ],
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });
});

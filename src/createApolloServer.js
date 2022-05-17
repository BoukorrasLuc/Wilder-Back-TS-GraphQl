const { ApolloServer, gql } = require('apollo-server');

const createApolloServer = () => {
  const typeDefs = gql`
    type Wilder {
      id: ID
      name: String
      city: String
      skills: [Skills]
    }
    type Skills {
      title: String
      votes: Int
    }
    # input est un objet qui contient les champs de l'objet
    input SpecialsSkills {
      title: String
      votes: Int
    }
    type Query {
      # trouver tous les wilders
      getWilders: [Wilder]
      # trouver le wilder par rapport a son id
      getWilder(id: ID): Wilder
    }
    type Mutation {
      # ajouter un wilder
      addWilder(name: String, city: String, skills: [SpecialsSkills]): Wilder
      # supprimer un wilder
      deleteWilder(id: ID): Wilder
      # modifier un wilder
      updateWilder(
        id: ID
        name: String
        city: String
        skills: [SpecialsSkills]
      ): Wilder
    }
  `;

  // // resolvers
  const resolvers = {
    Query: {
      getWilders: async () => await Wilder.find({}).exec(),
      getWilder: async (parent, args) => await Wilder.findById(args.id).exec(),
    },

    Mutation: {
      addWilder: async (parent, args) => {
        const wilder = new Wilder({
          name: args.name,
          city: args.city,
          skills: args.skills,
        });
        await wilder.save();
        return wilder;
      },
      deleteWilder: async (parent, args) => {
        await Wilder.findByIdAndDelete(args.id);
        return { id: args.id };
      },
      updateWilder: async (parent, args) => {
        const wilder = await Wilder.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            city: args.city,
            skills: args.skills,
          },
          { new: true }
        );
        return wilder;
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  // we don't run server.listen() here. The server is not yet started.
  return server;
};

module.exports = createApolloServer;

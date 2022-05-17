// Packages
const { gql } = require('apollo-server');

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

module.exports = typeDefs;

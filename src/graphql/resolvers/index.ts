// Models
const Wilder = require('../../models/wilder');

const resolvers = {
  Query: {
    getWilders: async () => await Wilder.find({}).exec(),
    getWilder: async (_: any, args: { id: any }) =>
      await Wilder.findById(args.id).exec(),
  },

  Mutation: {
    addWilder: async (
      _: any,
      args: { name: String; city: String; skills: [] }
    ) => {
      const wilder = new Wilder({
        name: args.name,
        city: args.city,
        skills: args.skills,
      });
      await wilder.save();
      return wilder;
    },
    deleteWilder: async (_: any, args: { id: String }) => {
      await Wilder.findByIdAndDelete(args.id);
      return { id: args.id };
    },
    updateWilder: async (
      _: any,
      args: { id: String; name: String; city: String; skills: [] }
    ) => {
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

module.exports = resolvers;

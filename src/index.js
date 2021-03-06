require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { middlewares } = require('./middlewares');
const { resolvers } = require('./resolvers');
// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  middlewares,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: true
    })
  })
});
server.start(() => console.log(`server is running`)); // eslint-disable-line

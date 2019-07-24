const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const catsData = [
  {
    id: 1,
    name: 'meow 😺',
    color: 'black'
  },
  {
    id: 2,
    name: 'moew 😻',
    color: 'yellow'
  },
  {
    id: 3,
    name: 'dog 😿',
    color: 'white'
  },
  {
    id: 4,
    name: 'cat 1 🙀',
    color: 'black'
  },
  {
    id: 5,
    name: 'cat 😽',
    color: 'black & white'
  }
];

// Define schema.
const schema = buildSchema(`
    type Query {
        cat(id: Int!): Cat
        cats(color: String): [Cat]
    },
    type Cat {
        id: Int
        name: String
        color: String
    }
`);

// Root resolver.
const getCat = args => catsData.find(catData => (catData.id = args.id));
const getCats = args =>
  catsData.filter(catData => catData.color === args.color);
const root = {
  cat: getCat,
  cats: getCats
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(6969);

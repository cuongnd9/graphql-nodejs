const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Define schema.
const schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver.
const rootValue = {
    message: () => 'Chao Xin 👋👋👋'
};

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: true
    })
);

app.listen(6969);

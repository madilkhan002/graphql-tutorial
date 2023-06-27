const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const userData = require('./UserData/data');

const app = express();

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    address: String!
  }

  input UserInput {
    name: String!
    email: String!
    address: String!
  }

  type RootQuery {
    users: [User!]!
  }

  type RootMutation {
    createUser(name: String!, email: String!, address: String!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): Boolean
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

const users = userData;

const rootValue = {
  users: () => {
    return users;
  },
  createUser: (args) => {
    const { name, email, address } = args;
    const newUser = {
      id: generateUniqueId(),
      name,
      email,
      address
    };
    users.push(newUser);
    return newUser;
  },
  updateUser: ({id, input}) => {
    const { name, email, address } = input;
    const user = users.find((user) => user.id.toString() === id.toString());
    if (!user) {
      throw new Error('User not found');
    }
    user.name = name;
    user.email = email;
    user.address = address;
    return user;
  },
  deleteUser: ({ id }) => {
    const index = users.findIndex((user) => user.id.toString() === id.toString());
    if (index === -1) {
      throw new Error('User not found');
    }
    users.splice(index, 1);
    return true;
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true
}));

// Serve the GraphiQL interface
app.use('/graphiql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true
}));

app.listen(8000, () => {
  console.log('Listening on port 8000');
});


function generateUniqueId() {
  return Math.floor(Math.random() * 100000).toString();
}

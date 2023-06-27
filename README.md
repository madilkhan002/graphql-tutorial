# GraphQL Server

This is a simple GraphQL server built using Node.js and Express. It provides basic CRUD operations for managing users.

## Getting Started

### Prerequisites

- Node.js (version 18.13.0)
- npm (version 8.19.3)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git

Install the dependencies:

cd your-repo
npm install
Usage
Start the server:
npm start
The server will be running at http://localhost:8000/graphql.

Open GraphiQL:

You can access the GraphiQL interface by visiting http://localhost:8000/graphiql. GraphiQL provides a user-friendly interface to interact with the GraphQL API.

GraphQL Schema<br>
The GraphQL schema defines the available types and operations in the API. Here are the main types <br>used in this server:<br>
<br><br>
User: Represents a user with the following fields:<br>
id: ID!<br>
name: String!<br>
email: String!<br>
address: String!<br>
Queries<br>
users<br>
Retrieves a list of all users.<br>
```
query {
  users {
    id
    name
    email
    address
  }
}

```
Mutations<br>
createUser<br>
Creates a new user.<br><br>

```
mutation {
  createUser(name: "John Doe", email: "johndoe@example.com", address: "123 Main St") {
    id
    name
    email
    address
  }
}
```

updateUser<br>
Updates an existing user by ID.<br><br>
```
mutation {
  updateUser(id: "1", input: { name: "Updated Name", email: "updated@example.com", address: "456 New St" }) {
    id
    name
    email
    address
  }
}
```
deleteUser<br>
Deletes a user by ID.<br>
```
mutation {
  deleteUser(id: "1")
}
```

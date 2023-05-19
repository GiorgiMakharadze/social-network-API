# Project Title

## Social network API

## Description

This is a Node.js and PostgreSQL-based API for a social network. It provides endpoints to manage users, such as retrieving all users, getting a user by ID, creating a new user, updating a user, and deleting a user.

## Used Technologies

In this build, I used Node.js, Express.js, PostgreSQL, TypeScript, Dotenv and etc.

## How to install

### Important

You need to create a PostgreSQL database.

Download and run npm install, then create a .env file at the root of the project and set the following environment variables:

```bash
PORT=
PGUSER=
PGPASSWORD=
```

Mongo uri example:

```bash
MONGO_URI=mongodb+srv://giorgi:yourClusterPassword@yourClusterName.zi9vxpj.mongodb.net/yourDatabaseName?retryWrites=true&w=majority
```

then run npm start.

## API Reference

### Retrieve all users

```http
  GET /users
```

#### Get a user by ID

```http
   GET /users/{id}
```

#### Create a new user

```http
  POST /users
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your username |
| `bio`      | `string` | **Required**. Your bio      |

#### Update a user

```http
    PUT /users/{id}
```

| Parameter  | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `username` | `string` | **Required**. Your new username |
| `bio`      | `string` | **Required**. Your new bio      |

#### Delete a user

```http
      DELETE /users/{id}
```

## Testing

To run the tests, execute the following command:

npm test

Running this command will execute the test suite, which includes tests for the API functionality. The tests will perform the following actions:

1. Create a test schema in the database.
2. Run tests to ensure the API endpoints function correctly.
3. Delete the test schema from the database.

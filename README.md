# Convenience Store

This is a small and personal back-end only project where a convenience store owner sells produces and emits receipts. A customer can purchase produces and get a receipt from the store.

The API is created with [GraphQL](https://graphql.org) and [Javascript](https://www.javascript.com). Under the hood, the API uses [Prisma](https://prisma.io) to communicate with the database which [PostGresQL](https://www.postgresql.org) was used.

## Installation

1. Clone the repository
2. (Recommended) Select the `master` branch
3. Install using the command:
```bash
$ npm install
```
4. Migrate the database with the following commands:
```bash
$ npx prisma migrate save --experimental
$ npx prisma migrate up --experimental
$ npx prisma generate
```
5. Run the server with the command `npm start`

## Features

Looking through the schema.graphql file:

1. You can send queries.
2. You can send mutations.
3. You can run subscriptions.

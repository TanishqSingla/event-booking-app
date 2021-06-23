import express from "express";
import bodyParser from "body-parser";

import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql'

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp.graphqlHTTP({
  schema: buildSchema(
    `type RootQuery {
      events: [String!]!
    }

    type RootMutation {
      createEvent(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }`
  ),
  rootValue: {
    events: () => {
      return ['Coding event', 'lunch', 'dinner']
    },
    createEvents: (args) => {
      const eventName = args.name;
      return eventName;
    }
  }
}));

app.listen(3000, () => {
  console.log("server is up and running at port 3000");
});

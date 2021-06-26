import express from "express";
import bodyParser from "body-parser";

import * as graphqlHttp from 'express-graphql';
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
      return ['Opening note', 'Conference', 'Closing note']
    },
    createEvents: (args: any) => {
      const eventName = args.name;
      return eventName;
    },
  },
  graphiql: true
}));

app.listen(3000, () => {
  console.log("server is up and running at port 3000");
});

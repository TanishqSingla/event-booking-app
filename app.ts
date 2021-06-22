import express from "express";
import bodyParser from "body-parser";

import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql'

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp.graphqlHTTP({
  schema: buildSchema(
    `schema {
      query: string
      mutation: string
    }`
  ),
  rootValue: {}
}));

app.listen(3000, () => {
  console.log("server is up and running at port 3000");
});

import express from "express";
import bodyParser from "body-parser";

import * as graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql'
import { DESTRUCTION } from "dns";

const app = express();

interface Event {
  title: string;
  description: string;
  price: number;
  date: string
}

interface EventQuery {
  eventInput: Event; 
}

const events: Array<Event> = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp.graphqlHTTP({
  schema: buildSchema(
    `type Event {
      _id: ID
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }`
  ),
  rootValue: {
    events: () => {
      return events
    },
    createEvents: (args: EventQuery) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date
        }

        events.push(event)
        return event;
    },
  },
  graphiql: true
}));

app.listen(3000, () => {
  console.log("server is up and running at port 3000");
});

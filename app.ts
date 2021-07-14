import express from "express";
import bodyParser from "body-parser";

import * as graphqlHttp from "express-graphql";
import  mongoose from "mongoose";
import { buildSchema } from "graphql";
import { PASSWORD, USERNAME } from "./secrets";
import { Event, EventModel } from "./models/event";

const app = express();

interface EventQuery {
  eventInput: Event;
}

const events: Array<Event> = [];

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp.graphqlHTTP({
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
        return events;
      },
      createEvents: (args: EventQuery) => {
        const event = new EventModel({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        });

        return event
          .save()
          .then((result) => {
            console.log(result);
            return result;
          })
          .catch((e) => {
            console.log(e);
            throw e;
          });
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.aac6e.mongodb.net/fistDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() =>
    app.listen(3000, () => {
      console.log("server is up and running at port 3000");
    })
  )
  .catch((e) => console.log(e));

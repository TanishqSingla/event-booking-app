import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get('/', (_req, res, _next) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log("server is up and running at port 3000");
});

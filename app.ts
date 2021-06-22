import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(3000, () => {
  console.log("server is up and running at port 3000");
});

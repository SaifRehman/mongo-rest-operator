import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import ListingMongoController from "./controllers/listing/index";
var mongoose = require("mongoose");
// Use the prom-client module to expose our metrics to Prometheus
const client = require("prom-client");

// enable prom-client to expose default application metrics
const collectDefaultMetrics = client.collectDefaultMetrics;

// define a custom prefix string for application metrics
collectDefaultMetrics({ prefix: "my_application:" });
const histogram = new client.Histogram({
  name: 'my_application:hello_duration',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 500]
});
mongoose.Promise = Promise;
class App {
  public express: express.Application;
  public mongoUrl: string =
    "mongodb://" +
    process.env.MONGOUSERNAME +
    ":" +
    process.env.MONGOPASSWORD +
    "@" +
    process.env.HOSTNAMEMONGODB +
    ":" +
    process.env.MONGOPORT +
    "/" +
    process.env.DB;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.mongoSetup();
  }
  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }
  private middleware(): void {
    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      next();
    });
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(
      session({ secret: "test123", saveUninitialized: false, resave: true })
    );
  }
  private routes(): void {
    this.express.get("/", function(_, res) {
      res.send("hi");
    });
    this.express.get("/greetings", function(request, res) {
        // start the timer for our custom metric - this returns a function
  // called later to stop the timer
  const end = histogram.startTimer();
  const name = request.query.name ? request.query.name : 'World';
  res.send({content: `Hello, ${name}!`});
  // stop the timer
  end({ method: request.method, 'status_code': 200 });
    });
    this.express.get("/metrics", function(_, response) {
      response.set("Content-Type", client.register.contentType);
      response.send(client.register.metrics());
    });
    this.express.use("/", ListingMongoController);
  }
}
export default new App().express;

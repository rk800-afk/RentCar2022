const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const database = require("./db");

const app = express();

const server = http.Server(app);
const PORT = 4000;

const bootstrap = () => {
  // Use Cors Set Origin
  app.use(
    cors({
      origin: "*",
    })
  );
  // for parsing application/json
  app.use(bodyParser.json());

  // for parsing application/xwww-
  app.use(bodyParser.urlencoded({ extended: true }));
  //form-urlencoded

  // set the view engine to ejs
  app.set('view engine', 'ejs');

  require("./sendFiles")(app) // Render Images, Files, Pages, JS, Styles 
  require("./api")(app); // API'S

  //     app.get('*', (_req, res) => {
  //         res.sendFile(
  //             path.resolve(
  //                 __dirname + '/RentCardemo/styles/pages/*.css',
  //             )
  //         );
  //     });

  server.listen(PORT, () => {
    console.log("Start", PORT);
  });
};

// Start DataBase and Server
database.bootstrap(bootstrap);

import http from "http";
import express from "express";
import passport from "passport";
import cors from "cors";
import bodyParser from "body-parser";

import database from "./db/index.mjs";

// MIDDLEWARE
import middlewarePassport from "./shared/middleware/passport.js"
import API from './api/index.js'
import { filesRoutes } from './sendFiles/index.js'

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

  // Passport INIT
  app.use(passport.initialize())
  middlewarePassport(passport)

  // set the view engine to ejs
  app.set('view engine', 'ejs');

  filesRoutes(app)  // Render Images, Files, Pages, JS, Styles 
  API(app); // API'S

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
database(bootstrap);

import http from "http";
import express from "express";
import passport from "passport";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import database from "./db/index.mjs";

// MIDDLEWARE
import middlewarePassport from "./shared/middleware/passport.js"
import API from './api/index.js'
import { filesRoutes } from './sendFiles/index.js'
import setUserToReq from "./shared/middleware/set-user-to-req.js";
import notFound from "./shared/middleware/404.js";

// BOT WEB TELE ROMCAR
import { bot } from './shared/services/bot-telegram.js'

const app = express();

const server = http.Server(app);
const PORT = 4000;

const bootstrap = () => {
  // Use Cors Set Origin
  app.use(
    cors({
      origin: "*",
      allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      methods: "*",
      credentials: true,
    })
  );
  app.use(cookieParser())
  // for parsing application/json
  app.use(bodyParser.json());

  // for parsing application/xwww-
  app.use(bodyParser.urlencoded({ extended: true }));
  //form-urlencoded

  // Passport INIT
  app.use(passport.initialize())
  middlewarePassport(passport)

  // Session 
  app.use(session({
    secret: process.env.ACCESS_TOKEN, // session secret
    resave: true,
    saveUninitialized: true
  }))
  app.use(passport.session())
  app.use(setUserToReq) // save user in req

  // set the view engine to ejs
  app.set('view engine', 'ejs');

  filesRoutes(app)  // Render Images, Files, Pages, JS, Styles 
  API(app); // API'S
  app.use(notFound) // 404

  // Listen for any kind of message. There are different kinds of
  // messages.
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    console.log(chatId);
    console.log(msg.message_id);

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
  });

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

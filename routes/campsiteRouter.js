//IMPORT Express from /node_modules
const express = require("express");
//set up an instance of EXPRESS ROUTER. Gives us an OBJECT named 'campsiteRouter' that we can use with EXPRESS ROUTING METHODS
const campsiteRouter = express.Router();

campsiteRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
    //pass control of application routing to next relevant ROUTING METHOD
  })

  //Next ROUTING METHOD handling GET REQUESTS
  .get((req, res) => {
    res.end("Will send all the campsites to you.");
  })
  .post((req, res) => {
    res.end(
      `Will add the campsite: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites.");
  })
  .delete((req, res) => {
    res.end("Deleting all campsites.");
  });

//EXPORTS the 'campsiteRouter' as a NODE MODULE to be used in other files
module.exports = campsiteRouter;

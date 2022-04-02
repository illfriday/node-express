//IMPORT EXPRESS, state we are using EXPRESS. bc EXPRESS is installed in NODE MODULES, we won't need to specify a FILE PATH here

const express = require("express");
//IMPORT MORGAN, MIDDLEWARE library for logging with EXPRESS SERVER
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;

//run the EXPRESS FUNCTION, which returns an EXPRESS SERVER APPLICATION, available under the VARIABLE NAME 'app'
const app = express();
//configure MORGAN MIDDLEWARE to use the Development Mode
app.use(morgan("dev"));
//Configure EXPRESS to serve STATIC FILES using .static(), built-in EXPRESS MIDDLEWARE. '__dirname' is a special VARIABLE in NODE. Using it refers to the ABSOLUTE PATH of the DIRECTORY that it's in
app.use(express.json());
//^^^Built-in MIDDLEWARE FUNCTION that handles parsing REQUESTS with json in the BODY into jS OBJECTS

//Add support for REST API ROUTING METHODS. use app.all() to set some defaults for all ROUTING METHODS
app.all("/campsites", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  next();
  //pass control of application routing to next relevant ROUTING METHOD
});

//Next ROUTING METHOD handling GET REQUESTS
app.get("/campsites", (req, res) => {
  res.end("Will send all the campsites to you.");
});

app.post("/campsites", (req, res) => {
  res.end(
    `Will add the campsite: ${req.body.name} with description: ${req.body.description}`
  );
});

app.put("/campsites", (req, res) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /campsites.");
});

app.delete("/campsites", (req, res) => {
  res.end("Deleting all campsites.");
});

//Add support for ROUTE PARAMETER 'campsiteID', enables functionality of requests for specific campsites
app.get("/campsites/:campsiteId", (req, res) => {
  res.end(
    `Will send details of the campsite: ${req.params.campsiteId} to you.`
  );
});

app.post("/campsites/:campsiteId", (req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on campsites/${req.params.campsiteId}`);
});

app.put("/campsites/:campsiteId", (req, res) => {
  res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
  res.end(
    `Will update the campsite: ${req.body.name} with the description: ${req.body.description}`
  );
});

app.delete("/campsites/:campsiteId", (req, res) => {
  res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + "/public"));

//use() METHOD can take a CALLBACK FUNCTION, which EXPRESS calls a MIDDLEWARE FUNCTION. This CALLBACK FUNCtION has access to 3 PARAMETERS: req, res, and next(another CALLBACK FUNCTION not used here)
//We are going to set this up to return the same RESPONSE to any REQUEST METHOD initially
app.use((req, res) => {
  // console.log(req.headers);
  //^^ Log will now be handled by MORGAN
  res.statusCode = 200;
  res.setHeader = ("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

//Call the listen() METHOD to create an instance of the HTTP SERVER CLASS and begin listening. Provide 'port', 'hostname' and a CALLBACK FUNCTION as ARGUMENTS

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

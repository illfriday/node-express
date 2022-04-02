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

//Use the listen() METHOD to create an instance of the HTTP SERVER CLASS and begin listening. Provide 'port', 'hostname' and a CALLBACK FUNCTION as ARGUMENTS

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

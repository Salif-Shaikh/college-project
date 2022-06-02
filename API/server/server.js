// Express package for creating and running server.
const express = require("express");
const upload = require("express-fileupload");

//Importing RouteHandler from location:-api/routes/routeHandler for api.
const routeHandler = require("../api/routes/routeHandler");

//Assigning Port number for server to listen on.
//Bellow "process.env.PORT" cmd get a random port form the system on which the server is created.
const port = process.env.PORT || 4004;

//Importing express functionality into app constant to use use express function.
const app = express();

//importing cors
const cors = require("cors");
const SaleRouter = require("../api/routes/saleRouteHandler");
const ResaleRouter = require("../api/routes/resaleRouteHandler");
const RentalRouter = require("../api/routes/rentalRouteHandler");
const PlotRouter = require("../api/routes/plotRouteHandler");
// const ReportRouter = require("../api/routes/reportRouteHandler");
// const WorkdayRouter = require("../api/routes/workdayRouteHandler");
// const UploadRouter = require("../api/routes/uploadRouteHandler");
// const { createApiLogs } = require("../utils/utilities");

//use function is a way to register a middleware or chain of middleware.
//Using urlencoded we will parse incoming request, same goes for express.json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Applying cors function
app.use(cors());

// Uploading
app.use(upload());

app.use("*", function (req, res, next) {
  // createApiLogs({
  //   description: req.headers.origin,
  //   apiurl: `${req.method}${req.originalUrl}`,
  //   objects: req.body,
  //   createby: "admin",
  // });
  return next();
});

const API = "/api/v1";

app.use(API, routeHandler);

// app.use(`${API}/workday`, WorkdayRouter);

app.use(`${API}/sale`, SaleRouter);

app.use(`${API}/resale`, ResaleRouter);

app.use(`${API}/rental`, RentalRouter);

app.use(`${API}/plot`, PlotRouter);

// app.use(`${API}/report`, ReportRouter);

// app.use(`${API}/upload`, UploadRouter);

//Making server listen to assigned port from port constant using listen function.
app.listen(port, err =>
  !err
    ? console.log("Server Listening on port:", port)
    : console.log("ERROR!", err)
);

//Run server file cmd:- node server.js.
//This server should be running to use api created in routeHandler file.

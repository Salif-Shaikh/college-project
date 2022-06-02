//Importing express to create api.
const express = require("express");

//Importing postgreDb to establish the connection to Database.
const postgreDb = require("../../database/dbConnect");

//Importing PlotRouter from express to create middleware
const PlotRouter = express.Router();

//To get leads of plots form the database.
PlotRouter.post("/getPlotLeads", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `SELECT "getPlotLeads"(
                '${request.body.limit}',
                '${request.body.offset}',
                '${request.body.startDate}',
                '${request.body.endDate}',
                '${request.body.location}')`
        ) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getPlotLeads)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To put plot feedback into the database
PlotRouter.put("/createPlotFeedback", (request, response) => {
  console.log(request.body.name);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "putPlotFeedback"(
                 '${request.body.description}', 
                 '${request.body.createdBy}',
                 '${request.body.leadId}',
                 '${request.body.followUpDate}');`
        )
        .then(res => {
          client.release(); //To release the client after the execution.
          // console.log("Done");
          response.send({ success: true }); //Omit this line during production.To show the outcome.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To get feedback of plotleads form the database.
PlotRouter.post("/getPlotFeedback", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getPlotLeadsFeedback"('${request.body.leadId}')`) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getPlotLeadsFeedback)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To update the brokerage of plot leads table.
PlotRouter.post("/updatePlotBrokerage", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updatePlotBrokerage"(
            '${request.body.updateBy}',
            ${request.body.brokerage},
            '${request.body.leadId}'
            )`
        ) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send({ success: true }); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To get the location of plot leads.
PlotRouter.get("/getLocationPlot", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getLocationPlot"()`) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getLocationPlot.location)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To get years of plot the leads
PlotRouter.get("/getYearPlot", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getYearPlot"()`) //Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getYearPlot)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To Update the "isdelete value"
PlotRouter.post("/deletePlotLead", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updatePlotDeleteValue"(
                '${request.body.leadId}',
                '${request.body.deleteBy}')`
        )
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send({ success: true }); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To Update leadstatus
PlotRouter.post("/updatePlotLeadStatus", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updatePlotLeadStatus"(
            '${request.body.updateby}',
                '${request.body.leadStatus}',
                '${request.body.leadId}')`
        )
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send({ success: true }); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

module.exports = PlotRouter;

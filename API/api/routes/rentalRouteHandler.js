//Importing express to create api.
const express = require("express");

//Importing postgreDb to establish the connection to Database.
const postgreDb = require("../../database/dbConnect");

//Importing RentalRouter from express to create middleware
const RentalRouter = express.Router();

//To get leads of rental properties from the database.
RentalRouter.post("/getRentalLeads", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `SELECT "getRentalLeads"(
                '${request.body.limit}',
                '${request.body.offset}',
                '${request.body.startDate}',
                '${request.body.endDate}',
                '${request.body.location}')`
        ) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getRentalLeads)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To put rental Feedback into the database
RentalRouter.put("/createRentalfeedback", (request, response) => {
  console.log(request.body.name);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "putRentalFeedback"(
                 '${request.body.description}',
                 '${request.body.createdBy}',
                 '${request.body.leadId}',
                 '${request.body.followUpDate}')`
        ) // Only rentalleadsId, mobile is of type Integer, (createdDate, updatedDate, deletedDate) are of type date and format YY-MM-DD.
        //rest are of type text.
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

//To update the brokerage of rental leads table.
RentalRouter.post("/updateRentalBrokerage", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updateRentalBrokerage"(
            '${request.body.updateBy}',
            ${request.body.brokerage},
            '${request.body.leadId}')`
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

//To get feedback of rentalleads from the database
RentalRouter.post("/getRentalFeedback", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getRentalLeadsFeedback"('${request.body.leadId}')`) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getRentalLeadsFeedback)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To get the location of rental leads.
RentalRouter.get("/getLocationRental", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getLocationRental"()`) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getLocationRental.location)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To get years of rental the leads
RentalRouter.get("/getYearRental", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getYearRental"()`) //Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getYearRental)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To Update "isdeleted" value
RentalRouter.post("/deleteRentalLead", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updateRentalDeleteValue"(
                '${request.body.leadId}',
                '${request.body.deleteBy}')`
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

//To Update leadStatus
RentalRouter.post("/updateRentalLeadStatus", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updateRentalLeadStatus"(
            '${request.body.updateby}',
                '${request.body.leadStatus}',
                '${request.body.leadId}')`
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

module.exports = RentalRouter;

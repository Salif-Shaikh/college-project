//Importing express to create api.
const express = require("express");

//Importing postgreDb to establish the connection to Database.
const postgreDb = require("../../database/dbConnect");
const { toCamel } = require("../../utils/utilities");

//Importing SaleRouter from express to create middleware
const SaleRouter = express.Router();

//To get leads of on sale properties from the database.
SaleRouter.post("/getSaleLeads", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `SELECT "getSaleLeads"(
                '${request.body.limit}',
                '${request.body.offset}', 
                '${request.body.startDate}', 
                '${request.body.endDate}',
                '${request.body.location}')`
        ) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getSaleLeads)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To put sale Feedback into the database
SaleRouter.put("/createSaleFeedback", (request, response) => {
  // console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "putSaleFeedback"( 
                 '${request.body.description}',
                 '${request.body.createdBy}',
                 '${request.body.leadId}',
                 '${request.body.followUpDate}')`
        ) // Only saleLeadsId, mobile is of type Integer, (createdDate, updatedDate, deletedDate) are of type date and format YY-MM-DD.
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

//To update the brokerage of sale leads table.
SaleRouter.post("/updateSaleBrokerage", (request, response) => {
  // console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updateSaleBrokerage"(
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

//To get feedback of saleleads from the database
SaleRouter.post("/getSaleFeedback", (request, response) => {
  // console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getSaleLeadsFeedback"('${request.body.leadId}')`) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getSaleLeadsFeedback)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To get the location of sale leads.
SaleRouter.get("/getLocationSale", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getLocationSale"()`) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getLocationSale.location)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To get years of sale the leads
SaleRouter.get("/getYearSale", (request, response) => {
  postgreDb
    .connect() // connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getYearSale"()`) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); // Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getYearSale)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To update "isdeleted" value
SaleRouter.post("/deleteSaleLead", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updateSaleDeleteValue"(
                '${request.body.leadId}',
                '${request.body.deleteby}')`
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

//To update leadstatus
SaleRouter.post("/updateSaleLeadStatus", (request, response) => {
  // console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updateSaleLeadStatus"(
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

module.exports = SaleRouter;

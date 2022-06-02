//Importing express to create api.
const express = require("express");

//Importing postgreDb to establish the connection to Database.
const postgreDb = require("../../database/dbConnect");

//Importing ResaleRouter from express to create middleware
const ResaleRouter = express.Router();

//To get leads of resale properties from the database.
ResaleRouter.post("/getResaleLeads", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `SELECT "getResaleLeads"(
                '${request.body.limit}',
                '${request.body.offset}',
                '${request.body.startDate}',
                '${request.body.endDate}',
                '${request.body.location}')`
        ) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows.map(row => row.getResaleLeads)); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getResaleLeads)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To put Resale Feedback into the database
ResaleRouter.put("/createResaleFeedback", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "putResaleFeedback"(
                 '${request.body.description}',
                 '${request.body.createdBy}',
                 '${request.body.leadId}',
                 '${request.body.followUpDate}')`
        ) // Only ResaleLeadsId, mobile is of type Integer, (createdDate, updatedDate, deletedDate) are of type date and format YY-MM-DD.
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

//To update the brokerage of resale leads table.
ResaleRouter.post("/updateResaleBrokerage", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updateResaleBrokerage"(
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

//To get feedback of REsaleleads from the database
ResaleRouter.post("/getResaleFeedback", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getResaleFeedback"('${request.body.leadId}')`) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getResaleFeedback)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To get the location of Resale leads.
ResaleRouter.get("/getLocationResale", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getLocationResale"()`) // Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getLocationResale.location)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To get years of resale the leads
ResaleRouter.get("/getYearResale", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(`SELECT "getYearResale"()`) //Parameters are of text type.
        .then(res => {
          client.release(); // To release the client after the execution of query.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows.map(row => row.getYearResale)); // To send actual response.
        })
        .catch(err => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch(err => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To Upsdate "isdeleted" Value
ResaleRouter.post("/deleteResaleLead", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updateResaleDeleteValue"(
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
ResaleRouter.post("/updateResaleLeadStatus", (request, response) => {
  console.log(request.body);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then(client => {
      client
        .query(
          `CALL "updateResaleLeadStatus"(
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

module.exports = ResaleRouter;

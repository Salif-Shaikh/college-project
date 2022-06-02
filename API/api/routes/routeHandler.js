//Importing express to create api.
const express = require("express");
const csvtojson = require("csvtojson");

//Importing postgreDb to establish the connection to Database.
const postgreDb = require("../../database/dbConnect");
const { filterNullData } = require("../../utils/utilities");

//Importing Router from express to create middleware
const Router = express.Router();

//creating middleware from below using Router and API METHODS.

//To check the user exist or not.
Router.post("/login", (request, response) => {
  // console.log(request.body.name, request.body.password);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then((client) => {
      client
        .query(
          `SELECT check_user('${request.body.name}','${request.body.password}')`
        ) // Parameters are of text type.
        .then((res) => {
          client.release(); // To release the client after the execution of query.
          // console.log("True"); //Omit this line during production.
          // console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send({ isValid: res.rows[0].check_user }); // To send actual response.
        })
        .catch((err) => {
          response.send({ isValid: false }); // To send actual response.
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch((err) => {
      response.send({ isValid: false }); // To send actual response.
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To get leads using DateFilter. This dateFilter in only for the reantlleads table.
Router.get("/dateFilter", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then((client) => {
      client
        .query(
          `SELECT datefilter(
              '${request.body.startDate}',
              '${request.body.endDate}')`
        ) // Parameters are of text type.
        .then((res) => {
          client.release(); // To release the client after the execution of query.
          console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows); // To send actual response.
        })
        .catch((err) => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch((err) => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To put new user into the database
Router.put("/createUser", (request, response) => {
  console.log(request.body.name);
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then((client) => {
      client
        .query(
          `CALL put_user(
               '${request.body.name}',
               '${request.body.password}',
               '${request.body.createdby}',
               '${request.body.updatedby}',
               '${request.body.createddate}',
               '${request.body.updateddate}',
               '${request.body.isdeleted}',
               '${request.body.deleteddate}',
               '${request.body.deletedby}',
               '${request.body.roleid}')`
        ) // Only roleId is of type Integer, (createdDate, updatedDate, deletedDate) are of type date format YY-MM-DD.
        //rest are of type text.
        .then((res) => {
          client.release(); //To release the client after the execution.
          console.log("userCreated...");
          console.log(res.rows); //Omit this line during production.To show the outcome.
        })
        .catch((err) => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch((err) => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//To display the users and its role.
Router.get("/usersRoleJoin", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then((client) => {
      client
        .query("SELECT usersrolejoin()") // userRoleJoin function doesn't have any params.
        .then((res) => {
          client.release(); // To release the client after the execution of query.
          console.log(res.rows); //Omit this line during production.To show the outcome.
          response.send(res.rows); // To send actual response.
        })
        .catch((err) => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch((err) => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

//FOR SEARCH
Router.post("/searchLeads", (request, response) => {
  postgreDb
    .connect() //connecting to postgresql using connect method.
    .then((client) => {
      client
        .query(
          `SELECT   saleleads AS "saleLeads", 
                    resaleLeads AS "resaleLeads", 
                    rentalLeads AS "rentalLeads",
                    plotLeads AS "plotLeads" 
                    from "globalSearchLeads"('${request.body.searchStr}');`
        ) // Parameters are of text type.
        .then((res) => {
          client.release(); // To release the client after the execution of query.
          //   console.log(res.rows.map(row => row.getResaleLeads)); //Omit this line during production.To show the outcome.
          response.send({
            saleLeads: filterNullData(res.rows, "saleLeads"),
            resaleLeads: filterNullData(res.rows, "resaleLeads"),
            rentalLeads: filterNullData(res.rows, "rentalLeads"),
            plotLeads: filterNullData(res.rows, "plotLeads"),
          }); // To send actual response.
        })
        .catch((err) => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch((err) => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
});

// Upload CSV file using Express Rest APIs
Router.post("/csvUpload", (req, res) => {
  /** convert req buffer into csv string ,
   *   "csvfile" is the name of my file given at name attribute in input tag */
  // console.log("====================================");
  // console.log(req);
  // console.log(req.files.File.data);
  // console.log("====================================");

  // const bulkUpload = (param , req) => {

  // };

  Promise.resolve(
    csvtojson()
      .fromString(req.files.File.data.toString("utf8"))
      .then((json) => res.status(201).json(json))
  ).then((data) => console.log(data));
});

// const jsonData = JSON.stringify(
// postgreDb
//         .connect() //connecting to postgresql using connect method.
//         .then((client) => {
//           client
//             .query(`CALL "tempEntry"('${jsonData}');`)
//             .then((res) => {
//               client.release(); //To release the client after the execution.
//               console.log("csvFileData...");
//               console.log(res.rows); //Omit this line during production.To show the outcome.
//             })
//             .catch((err) => {
//               console.log("ERROR!!!", err); //ERROR in the query.
//             });
//         })
//         .catch((err) => {
//           console.log("ERROR!!", err); //ERROR after connecting the database.
//         });

//Exporting router to be used in the server file as "RouteHandler".
module.exports = Router;

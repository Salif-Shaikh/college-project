const postgresDb = require("../database/dbConnect");

const toCamel = (o) => {
  var newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (
          origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
        ).toString();
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamel(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
};

//To put the api Logging activity.
const createApiLogs = (params) => {
  // console.log(params);
  postgresDb
    .connect() //connecting to postgresql using connect method.
    .then((client) => {
      client
        .query(
          `CALL "createApiLogs"(
                      '${params.description}',
                      '${params.apiurl}',
                      '${JSON.stringify(params.objects)}',
                      '${params.createby}'
        )`
        )
        .then((res) => {
          client.release(); // To release the client after the execution of query.
          console.log("Done"); //Omit this line during production.To show the outcome.
          // response.send({ success: true }); // To send actual response.
        })
        .catch((err) => {
          console.log("ERROR!!!", err); //ERROR in the query.
        });
    })
    .catch((err) => {
      console.log("ERROR!!", err); //ERROR after connecting the database.
    });
};

const filterNullData = (list, identifier) =>
  list
    .map((row) => (row[identifier] !== null ? row[identifier] : false))
    .filter((data) => data !== false);

module.exports = {
  toCamel,
  createApiLogs,
  filterNullData,
};

// Source - previous experience with pg-promise, stack overflow, and this source:
// https://medium.com/dev-genius/getting-started-with-heroku-postgres-in-node-53f88c72429d
var pgp = require('pg-promise')()

const cn = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? true : false
};

const db = pgp(cn);

db.connect()
.then(function (obj) {
  console.log("connected to database")
  obj.done()
})
.catch(function (error){
  console.log("ERROR connecting to db: ", error.message);
});

module.exports = db;

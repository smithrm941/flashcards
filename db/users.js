const db = require('../dbcon.js')

const findUserByEmail = function(email) {
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE
      email = $1
    `, [email])
    .then((user) => {
      return user[0]
    })
}

const addNewUser = function(email, first_name, last_name, password) {
  return db.query(`
    INSERT INTO
      users (email, first_name, last_name, password)
    VALUES
      ($1, $2)
    RETURNING
      *
    `, [email, first_name, last_name, password])
    .then((user) => {
      return user[0]
    })
}

module.exports =  {
  findUserByEmail,
  addNewUser
}

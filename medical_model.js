const Pool = require('pg').Pool
const pool = new Pool({
  user: 'max',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

const getdoctors = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM doctors ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
     //resolve(results.rows);
    })
  }) 
}

const createdoctors = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, district } = body

    pool.query('INSERT INTO doctors (name, district) VALUES ($1, $2) RETURNING *', [name, district], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new doctor has been added: ${JSON.stringify(results.rows[0])}`)
    })
  })
}

const deletedoctors = (doctorId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(merchantId)

    pool.query('DELETE FROM doctors WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Doctor deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getdoctors,
  createdoctors,
  deletedoctors,
}


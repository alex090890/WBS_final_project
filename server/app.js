const express = require('express')
const app = express()
require('dotenv').config()
console.log(process.env)

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})
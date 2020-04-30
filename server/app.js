const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const transformCode = require('./es5')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.get('/', function (req, res) {
   res.json({})
})

app.post('/api/es5', function (req, res) {
  const str = transformCode(req.body.data)
  try {
    console.log('str', str)
    res.json({
      code: 0,
      data: str
    })
  } catch (error) {
    res.json({
      code: 1,
      data: ''
    })
  }
})

const server = app.listen(8089, '0.0.0.0', () => {
  const host = server.address().address
  const port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const transformCode = require('./es5')
const SparkMD5 = require('spark-md5')
const { fstat } = require('fs')
app.use(bodyParser.urlencoded({ extended: false, limit: '1024mb' }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const uplodDir = path.join(__dirname, 'upload')
app.get('/', function (req, res) {
   res.json({})
})

app.post('/api/upload', async (req, res) => {
  let {chunk, filename} = req.body
  chunk = decodeURIComponent(chunk)
  console.log('chunk', chunk)
  console.log('filename', filename)
  chunk = chunk.replace(/^data:image\/\w+;base64,/, "")
  console.log('chunk----2', chunk)
  chunk = Buffer.from(chunk, 'base64')
  let spark = new SparkMD5.ArrayBuffer(),
      suffix = /\.([0-9a-zA-Z]+)$/.exec(filename)[1],
      path;
  spark.append(chunk);
  path = `${uplodDir}/${spark.end()}.${suffix}`
  fs.writeFileSync(path, chunk);
  res.send({
    code: 0,
    originalFilename: filename,
    path: path.replace(__dirname, 'http://127.0.0.1:8089')
  })
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
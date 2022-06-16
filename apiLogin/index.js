const express = require('express')
var app = express();
var cors = require('cors')
app.use(express.json())
app.use(cors())
const dotenv = require('dotenv'); // get config vars

dotenv.config(); // access config var //process.env.TOKEN_SECRET

const log4js = require("log4js");
log4js.configure({
    appenders: { SummaMove: { type: "file", filename: "SummaMove.log" } },
    categories: { default: { appenders: ["SummaMove"], level: "error" } }
});

const logger = log4js.getLogger("SummaMove");
logger.level = "debug";

let access_token = process.env.TOKEN_SECRET

var mysql = require('mysql');
const { error } = require('console');

//var db = mysql.createConnection({
 // host: "127.0.0.1",
 // user: "root",
 // password: "",
 // database: "login",
//});
var db = mysql.createConnection({
    host: "191.96.96.200",
    user: "u3192_uSBzgZ4mMq",
    password: "Lj^Vy=PDs.y.FcuhP1lQtaDF",
    database: "s3192_DaanApi",
});


db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  logger.debug("Database connection established");
});





app.get("/oefeningen", authenticateToken, (req, res) => {
  db.query("SELECT * FROM vehicles", async (err, result) => {
    if (err) throw err;

    const data ={}
    await generateAccessToken();  
    data.access_token = access_token
    data.vehicles = result
    res.json(data)
    logger.debug("Gebruiker heeft alle oefeningen opgevaagd");
  })
})



app.post('/register', (req, res) => {
  let data = req.body
  console.log(data)


  db.query(`INSERT INTO users (username, password, email) VALUES ('${data.username}', '${data.password}', '${data.email}')`, (err, result) => {
    if (err) throw err;
    res.status(200).send("REGISTER OK")
    generateAccessToken();
    logger.debug(`user registered succesfull | username: ${data.username} | password: ${data.password} | Email: ${data.email}`);
  })
})

app.delete("/delete/:id", authenticateToken, (req, res) => {
 
  db.query(`DELETE FROM vehicles WHERE id=${req.params.id}`, async (err, result) => {
    if (err) throw err;
    const data = {}
   
    await generateAccessToken();
    data.access_token = access_token
    res.status(200).json(data)
    logger.debug(`user deleted an vehicle succesfull | id: ${req.params.id}`);
  })
})

app.get('/vehicle/:id', authenticateToken, (req,res) => {
  
  db.query("SELECT * FROM vehicles WHERE id = " + req.params.id, async(err, result) => {
    if (err) throw err;
    await generateAccessToken()
    let data ={}
    data.access_token = access_token
    data.vehicle = result[0]
    res.json(data)


    logger.debug(`user requested data of an vehicle succesfull | id: ${req.params.id}`);
  })
})

app.put("/vehicle", authenticateToken, (req, res) => {
  let data = req.body 

  db.query(`UPDATE vehicles SET brand = '${data.brand}', model = '${data.model}', pk = '${data.horsepower}', torque = '${data.torque}', price = '${data.price}' WHERE id = ${data.id}`, async (err, result) => {
    if (err) throw err;
    const data = {}
    await generateAccessToken();

    data.access_token = access_token
    res.status(200).json(data)
    logger.debug(`user updated data of an vehicle succesfull | id: ${req.params.id}`);
  })
})

app.post("/addvehicle", authenticateToken, (req, res) => {
  let data = req.body
  console.log(data)

  db.query(`INSERT INTO vehicles (brand, model, pk, torque, price) VALUES ('${data.brand}', '${data.model}', '${data.horsepower}', '${data.torque}', '${data.price}')`, async (err, result) => {
    if (err) throw err;
    await generateAccessToken()
    let data ={}
    data.access_token = access_token
    res.status(200).json(data)
    logger.debug(`user added an vehicle succesfull`);
  })
})

app.post("/login", async (req, res) => {
  let data = req.body


  db.query("SELECT * FROM users", async (err, result) => {
    if (err) throw err;
    for (i = 0; i < result.length; i++) {
      let v = result[i]
      if (v.username === data.username) {
        if (v.password === data.password) {
          const data ={}
          await generateAccessToken();
          data.access_token = access_token
          res.status(200).json(data)
          logger.debug(`login succes`);

        }
      }
    }
    res.status(401)
  })
})

function authenticateToken(req, res, next) {

  const token = req.headers['authorization']

  console.log('token: ', token, access_token)

  if (token == null) return res.sendStatus(401)

  if (token != access_token) return res.sendStatus(401)

  next()

}


const generateAccessToken = async () => {


  const { v4: uuidv4 } = require('uuid');

  access_token = uuidv4();
}




const server = app.listen(24187, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Luister op http://%s%s", host, port);
})


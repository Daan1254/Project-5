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

let acces_token = process.env.TOKEN_SECRET

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

app.get("/spiergroepen", authenticateToken, (req, res) => {
  db.query("SELECT * FROM spiergroepen", async (err, result) => {
    if (err) throw err;

    const data ={}
    await generateAccessToken();  
    data.acces_token = acces_token
    data.oefeningen = result
      
    res.json(data)
    logger.debug("user requested all spiergroepen");

  })
})



app.get("/users", authenticateToken, (req, res) => {
  db.query("SELECT * FROM users", async (err, result) => {
    if (err) throw err;

    const data ={}
    await generateAccessToken();  
    data.acces_token = acces_token
    data.users = result
    res.json(data)
    logger.debug("user requested all users");

  })
})

app.get("/oefeningen", authenticateToken, (req, res) => {
  db.query("SELECT * FROM oefeningen", async (err, result) => {
    if (err) throw err;

    const data ={}
    await generateAccessToken();  
    data.acces_token = acces_token
    data.oefeningen = result
    res.json(data)
    logger.debug("user requested all oefeningen");

  })
})

app.get("/roles", authenticateToken, (req, res) => {
  db.query("SELECT * FROM roles", async (err, result) => {
    if (err) throw err;

    const data ={}
    await generateAccessToken();  
    data.acces_token = acces_token
    data.roles = result
    res.json(data)
    logger.debug("user requested all roles");

  })
})
app.get('/oefeningen/:id', authenticateToken, (req,res) => {
  
   db.query("SELECT * FROM oefeningen WHERE id = " + req.params.id, async(err, result) => {
     if (err) throw err;
     await generateAccessToken()
     let data ={}
     data.acces_token = acces_token
     data.oefening = result[0]
     res.json(data)
     logger.debug(`user requested data of an oefening succesfull | id: ${req.params.id}`);
   })
 })

app.get('/spiergroep/oefening/:id', authenticateToken, (req,res) => {
  
   db.query("SELECT * FROM oefeningen WHERE spiergroepid = " + req.params.id, async(err, result) => {
     if (err) throw err;
     await generateAccessToken()
     let data ={}
     data.acces_token = acces_token
     data.oefening = result
     res.json(data)
     logger.debug(`user requested data of an oefening succesfull | id: ${req.params.id}`);
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


app.post("/addUser", authenticateToken, (req, res) => {
  let data = req.body

  db.query(`INSERT INTO users (username, password, email, roleid) VALUES ('${data.username}', '${data.password}', '${data.email}', ${data.userRole})`, (err, result) => {
    if (err) throw err;
    generateAccessToken();
    let data = {}
    data.acces_token = acces_token
    res.json(data)
    logger.debug(`admin added succesfull | username: ${data.username} | password: ${data.password} | Email: ${data.email} | RoleId: ${data.userRole}`);
  })
})

app.delete("/oefeningen/delete/:id", authenticateToken, (req, res) => {
 
  db.query(`DELETE FROM oefeningen WHERE id=${req.params.id}`, async (err, result) => {
    if (err) throw err;
    const data = {}
   
    await generateAccessToken();
    data.acces_token = acces_token
    res.status(200).json(data)
    logger.debug(`user deleted an exercise succesfull | id: ${req.params.id}`);
  })
})

app.delete("/users/delete/:id", authenticateToken, (req, res) => {
 
  db.query(`DELETE FROM users WHERE id=${req.params.id}`, async (err, result) => {
    if (err) throw err;
    const data = {}
   
    await generateAccessToken();
    data.acces_token = acces_token
    res.status(200).json(data)
    logger.debug(`succesfully deleted an user | id: ${req.params.id}`);
  })
})

// app.get('/vehicle/:id', authenticateToken, (req,res) => {
  
//   db.query("SELECT * FROM vehicles WHERE id = " + req.params.id, async(err, result) => {
//     if (err) throw err;
//     await generateAccessToken()
//     let data ={}
//     data.acces_token = acces_token
//     data.vehicle = result[0]
//     res.json(data)


//     logger.debug(`user requested data of an vehicle succesfull | id: ${req.params.id}`);
//   })
// })

app.put("/oefeningen/edit/:id", authenticateToken, (req, res) => {
  let data = req.body 

  db.query(`UPDATE oefeningen SET name = '${data.name}', description = '${data.description}', picture = '${data.picture}' WHERE id = ${req.params.id}`, async (err, result) => {
    if (err) throw err;
    const data = {}
    await generateAccessToken();

    data.acces_token = acces_token
    res.status(200).json(data)
    logger.debug(`user updated data of an exercise succesfull | id: ${req.params.id}`);
  })
})


app.put("/editUser", authenticateToken, async (req, res) => {
  let data = req.body

  db.query(`UPDATE users SET username = '${data.username}', password = '${data.username}', email = '${data.email}', roleid = ${data.userRole} WHERE id = ${data.id}`, async (err, result) => {
    if (err) throw err;
    const data = {}
    await generateAccessToken();

    data.acces_token = acces_token
    res.status(200).json(data)
    logger.debug(`user updated data of an user succesfull | id: ${req.params.id}`);
  })
})

app.put("/oefeningen/user/:id", authenticateToken, async (req, res) => {
  let data = req.body 

  db.query(`UPDATE user SET username = '${data.username}', email = '${data.email}', roleid = '${data.roleid}' WHERE id = ${req.params.id}`, async (err, result) => {
    if (err) throw err;
    const data = {}
    await generateAccessToken();

    data.acces_token = acces_token
    res.status(200).json(data)
    logger.debug(`admin succesfully changed user details. | id: ${req.params.id}`);
  })
})
 app.post("/oefeningen/create", authenticateToken, async (req, res) => {
   let data = req.body

   db.query(`INSERT INTO oefeningen (name, description, picture) VALUES ('${data.name}', '${data.description}', '${data.picture}')`, async (err, result) => {
     if (err) throw err;
     await generateAccessToken()
     let data ={}
     data.acces_token = acces_token
     res.status(200).json(data)
     logger.debug(`user created data of an exercice succesfully.`);
   })
 })
app.post("/login", async (req, res) => {
  let data = req.body
  let found = false
  console.log(data)

  db.query("SELECT * FROM users", async (err, result) => {
    if (err) throw err;
    for (i = 0; i < result.length; i++) {
      let v = result[i]
      if (v.username === data.username) {
        if (v.password === data.password) {
          const data ={}
          await generateAccessToken();
          data.acces_token = acces_token
          data.userid = v.id
          data.username = v.username
          res.status(200).json(data)
          //res.json(data)
          logger.debug(`login succes`);
           return
        }
      }
    }
       res.status(401).send("Login gefaald")
  })
})

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']
  console.log('token: ', token, acces_token)
  if (token == null) return res.sendStatus(401)
  if (token != acces_token) return res.sendStatus(401)
  next()
}


const generateAccessToken = async () => {
  const { v4: uuidv4 } = require('uuid');
  acces_token = uuidv4();
}

const server = app.listen(24187, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Luister op http://%s%s", host, port);
})
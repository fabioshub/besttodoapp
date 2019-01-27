const express = require('express');
const bodyParser = require('body-parser');
// const mySql = require('mysql2');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
// console.log(__dirname + '/public')

const api = express();

// const connection = mySql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Iliketurtles12",
//     database: "bestapp"
// })


// try {
//     connection.connect();

// } catch (e) {
//     console.log("EERERRRROOORORRR")
//     console.log(e)
// }

api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

api.use(bodyParser.json())
api.use(express.static(__dirname + '/build'))

db.defaults({ 
    
users: [{
    "username": "fabio",
    "password": "lego"
  },
  {
    "username": "monika",
    "password": "lowe"
  }], 
notelist: [{
    "username": "fabio",
    "notes" : "note1"
  }] 

    })
  .write()


api.listen(5000, () => {

    console.log('Api online!')
})

api.post('/login', (req, res) => {
    const user =  db.get('users')
                .find({ username: req.body.username, password: req.body.password })
                .value()

    if (user) {
        res.send({login: true})
    } else res.send({login: false})


   
})

api.post('/newuser', (req, res) => {

    db.get('users')
    .push({username: req.body.username, password: req.body.password})
    .write()
    return res.json({gelukt: "aangemaakt"})
})



api.post('/notes', (req, res) => {

    db.get('notelist')
    .push({"username": req.body.username,"notes" :req.body.note})
    .write()
    return res.json("gelukt!")
})


api.post('/getnotes', (req, res) => {

    const note = db.get('notelist')
    .filter({"username" : req.body.username})
    .map("notes")
    .value()
    return res.json(note)
})

api.delete('/deletenotes', (req, res) => {

  console.log(db.get('notelist').remove({"notes": req.body.notes, "username" : req.body.username}).write())
  return res.json("done")
})





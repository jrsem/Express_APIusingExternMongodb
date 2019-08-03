const express = require('express');
//we use the object "mongoClient" to access the database, because the data is
//in a the outer site(https://mlab.com) and we have to access it by url. 
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
//para copiar o mudulo db aqui
const db = require('./config/db')
const app = express();
const port = 3000;


//to undestand the dados format(json) of "Postman software".
// parse application/json
app.use(bodyParser.json({ extended: true }));
//to undestand the dados format(x-www-form-urlencoded) of "Postman software".
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  //"jr_testdb" is the name of the database creted in the site (https://mlab.com)  
  my_db = database.db("teste");

  require('./app/routes')(app, my_db);
  app.listen(port, () => {
    console.log("we live on port:" + port);
  });
});
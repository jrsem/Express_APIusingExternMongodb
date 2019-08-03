//we make this module/file(note_routes.js) represent as a function, where this function
//when executed return two object "app e db".
//When this function execute he execute one of the function inside of him, depend of the url
//or type of the request
module.exports = function (app, db) {

  //THIS FUNCTION IS TO GET DATA FROM DATABASE TO BROWSER
  //when the browser receive url "http://127.0.0.1:3000/notes/id", this function 
  //is executed and this function return two object "app e db".
  var ObjectID = require('mongodb').ObjectID
  //"req" is the object receive by the post function, this object has the data of the request, 
  //means the dada from the browser or postman software to the server.

  //"res" is the return value of the post function , means has to send to the browser  or postman software.
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;//this function use parameter, means the parameteris in the url(http://127.0.0.1:3000/notes/5d4608b4d21a1116aa9f5a72)
    //the parameter is "5d4608b4d21a1116aa9f5a72".
    //NB)we "req.params" is because in the postman sofware we we have to select "params" not "Body" , means this function use parameter.
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });//send to the browser
      } else {
        res.send(item);//send to the browser
      }
    });
  });

  //THIS FUNCTION IS TO SAVE DATA FROM BROWSER TO DATABASE
  //when the browser receive url "http://127.0.0.1:3000/notes", this function is executed.

  //"req" is the parameter receive by the post function, this parameter has the data of the request, 
  //means the dada from the browser or postman software to the server.

  //"res" is the return value of the post function , means has to send to the browser  or postman software.
  app.post('/notes', (req, res) => {
    //we create an object where temos como atributos "tsxt and title".
    //retreive the data from the request to create this object.
    //we put the content of "req.body.body" to "text"
    //we put the content of "req.body.title" to "title"
    const note = { text: req.body.body, title: req.body.title };//this function dont use parameter, means the url don't have parameter, 
    // stay like this (http://127.0.0.1:3000/notes)
    //NB)we "req.body" is because in the postman sofware we have to select "Body" not "params", means this function don't use parameter

    //with the data(note) ready, we pass the data as parameter to create a colection call "myCollection".
    //NB) a colection represent a record of a database table
    const myCollection = db.collection('notes');//"notes" is the collection name

    //we call the insert() method into this colection to save it into the databasa,
    //and this method return two object "err and result".
    //if not save successfully in the database a erro occur.
    myCollection.insert(note, (err, result) => {//vamos inserir os   //dados neste collection e tambem
      if (err) {
        res.send({ 'error': 'An error has occurred' });//send to the browser
      } else {
        res.send(result.ops[0]);//send to the browser
      }
    });
  })

  //THIS FUNCTION IS TO DELETE REQUEST/ITEM BY ID IN THE DATABASE
  //when the browser receive url "http://127.0.0.1:3000/notes/id" this function 
  //is executed.
  //"req" is the object receive by the post function, this object has the data of the request, 
  //means the dada from the browser or postman software to the server.

  //"res" is the return value of the post function , means has to send to the browser  or postman software.
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;//this function use parameter, means the parameteris in the url(http://127.0.0.1:3000/notes/5d4608b4d21a1116aa9f5a72)
    //the parameter is "5d4608b4d21a1116aa9f5a72".
    //NB)we "req.params" is because in the postman sofware we we have to select "params" not "Body" , means this function use parameter.
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });//send to the browser
      } else {
        res.send('Note:' + id + 'has been deleted');//send to the browser
      }
    });
  });



  //THIS FUNCTION IS TO UPDATE A COLLECTIONS IN THE DATABASE BY ID
  //when the browser receive url "http://127.0.0.1:3000/notes/id" this function 
  //is executed.
  //"req" is the object receive by the post function, this object has the data of the request, 
  //means the dada from the browser or postman software to the server.

  //"res" is the return value of the post function , means has to send to the browser  or postman software.
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;//this function use parameter, means the parameteris in the url(http://127.0.0.1:3000/notes/5d4608b4d21a1116aa9f5a72)
    //the parameter is "5d4608b4d21a1116aa9f5a72".
    //NB)we "req.params" is because in the postman sofware wewe have to select "params" not "Body" , means this function use parameter.
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });//send to the browser
      } else {
        res.send('Note:' + id + 'has been updated');//send to the browser
      }
    });
  });
  // NB) MongoDb Save data as collections
}//end function module







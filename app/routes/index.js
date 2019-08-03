
//we import the noteRoutes() function from the note_routes.js file here. 
const noteRoutes = require('./note_routes');
//when the function index() execute by the server, he call the function noteRoutes(). 
//by passing as parameters "app and db" to the   "note_routes" file.
module.exports = function (app, db) { //here is the definition f the function index()
  noteRoutes(app, db);//we call tha function here noteRoutes()inside the fonction index()
}
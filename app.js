
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//--------------------------------------------------
// user
//--------------------------------------------------
var user = require('./routes/user');
app.get('/users', user.list);
//--------------------------------------------------
// type
//--------------------------------------------------
var type = require("./routes/type");
var typeRender = require("./routes/typeRender");
app.get("/type",typeRender.index);
app.get("/type/list",type.list);
app.post("/type/add",type.add);

//NODE_ENV
//PORT
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var express = require('express')
var app = express()
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');

var helmet = require('helmet')
app.use(helmet())

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*',function(req,res,next){ 
  fs.readdir('./data', function(error, filelist){
    req.list = filelist; //req객체의 list값에 filelist담음
    next();
  });
})

app.use('/',indexRouter);
app.use('/topic',topicRouter);

app.use(function(req,res,next){
  res.status(404).send('Sorry cant find that!')
})

app.use(function(err,req,res,next){ //error handling
  console.log(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => console.log("listening on port 3000!!"))

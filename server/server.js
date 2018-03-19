require('dotenv').load({silent: true});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const util = require ('util');
const pgQuery = require('pg-query');
const session = require('express-session');
const passport = require('./strategies');
const userRegistration = require('./routes/userRegistration');
const index = require('./routes/index.js');
const login = require('./routes/login.js');
const createUrl = require('./routes/createUrl');
const urls = require('./modules/urls');
const tinyUrlsRedirect = require('./routes/tinyUrlsRedirect');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

pgQuery.connectionParameters = 'postgres://localhost:5432/teensyWeensy'; //local

//express Session Configuration
app.use(session({
   secret: process.env.SECRET,
   key: 'user', //this is the name of the key that will be attached to req.session or maybe req.user, can't remember
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 600000, secure: false}
}));

app.use('/static-login', express.static (path.join(__dirname, '../dist/login')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/static-app', (req, res, next) =>{
  if(req.isAuthenticated()) next();
  else{
    res.sendFile(path.join(__dirname, "../dist/login/sign-on.html"));
  }
},express.static (path.join(__dirname, '../dist/app')));

//routes
app.use( (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});



app.get('/:test', (req, res)=>{
  console.log('test', req.params.test)
  console.log('3rd urls', urls.getUrls())
  res.json({message: "hi mom"})
})




// app.get('/test2:url', (req, res)=>{
//   urls.map( urlx => {
//     if (url == urlx) res.pipe(urlx.longUrl)
//   })
// })

app.use('/login', login);
app.use('/register', userRegistration)
app.use('/create-url', authenticate, createUrl)

app.use('/a', tinyUrlsRedirect);
urls.addUrl('xcs');

app.use('/', index);



app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), () => {
  util.log(' listening on port ', app.get('port'));
});


/////////  UTILS  ////////////////////////


function authenticate(req, res, next){
  if(req.isAuthenticated()) next();
  else{
    res.status(403).sendFile(path.join(__dirname, "../dist/login/sign-on.html"));
  }
}
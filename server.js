const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT ||  3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine',hbs);
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log = `${now} Requesting for[${req.method}]: ${req.url}`;
  fs.appendFile('server.log',log+ '\n',(err)=>{});
  next();
});



hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});



app.get('/',(req,res)=>{
  // res.send("<h1>Hello Shriman<//h1>");
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMsg:'Welcome to express'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    Error:'Error not found,bad request !'
  });
})


app.listen(port,()=>{
  console.log(`Server is up and listening ${port}`);
});

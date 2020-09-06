var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MegalodonPig0!",
  database: "NationGame",
  insecureAuth : true
});

var userloggedin;
app.get('/',function(req,res){
app.use(express.static('Public'))
 
});

 
  con.connect(function(err) {
	  //sign up 
app.post('/signup',function(req,res){
  var name=req.body.namesign;
  var email=req.body.email;
  var password=req.body.passwordsign;
  var password2=req.body.password2sign;
  var usernamecheck = [];
  var emailcheck = [];

  //check if username has been taken
  con.query('SELECT * FROM login WHERE name = '+mysql.escape(name), function (err, result) {
    if (err) throw err;
	if (result.length != 0){
	usernamecheck = result[0].name;}
 if (usernamecheck != name){
	 //check if email has been taken
	 	  con.query('SELECT * FROM login WHERE email = '+mysql.escape(email), function (err, result) {
			   
    if (err) throw err;
	if (result.length != 0){
	emailcheck = result[0].email;}
	console.log(emailcheck);
	if (emailcheck != email){
		//doublecheck the damn password
     if (password == password2){
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'evilpiggyfoofoo@gmail.com',
    pass: 'EvilPig0!'
  }
});
var mailOptions = {
  from: 'evilpiggyfoofoo@gmail.com',
  to: 'deathhollo@gmail.com',
  subject: req.body.email,
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    var name=req.body.namesign;

  if (err) throw err;
  	var confcode = makeid();
	console.log(confcode);
  var sql = "INSERT INTO login (name, email, password, confirmationcode) VALUES ('"+name+"', '"+email+"','"+password+"','"+confcode+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
	  res.redirect('/Setup.html');
     res.end();
  });

}

 if (password!=password2) { res.write("Error:Passwords Don't Match");  res.end();} 
		  }
		  else if (emailcheck == email) {res.write("Error:Email has been taken");res.end();}
		  })}
 else if (usernamecheck == name) {res.write("Error:Username has been taken");res.end();}
});
  
})
	 //login 
  app.post('/login',function(req,res){
  var name=req.body.namelogin;
  var password=req.body.passwordlogin;
  var passwordcheck = 0;
  

    if (err) throw err;
console.log  (name);
con.query('SELECT * FROM login WHERE name = '+mysql.escape(name), function (err, result) {
    if (err) throw err;
    console.log(result);
	if (result.length > 0){
	passwordcheck = result[0].password;}
if (passwordcheck == password){
	userloggedin = name;
	  res.redirect('/Game.html');
console.log('result is : ', password);}
else if(passwordcheck != password) {
	res.write("Login failed, user name and password doesn't match")
}
res.end();   
});        

})

//confirmation code
app.post('/confCode',function(req,res){
  var code =req.body.confCode;
var email = req.body.email;
  var confcode = 0;

    if (err) throw err;

con.query('SELECT * FROM login WHERE email = '+mysql.escape(email), function (err, result) {
    if (err) throw err;
    console.log(result);
	if (result.length > 0){
	confcode = result[0].confCode;}
if (confCode == code){
	document.getElementById('id03').style.display='block';
console.log('result is : ', confCode);}
else if(passwordcheck != password) {
	res.write("Confirmation Code is wrong, please go back and try again")
}
res.end();    
});       
})
})
app.listen(8080);
console.log("Running at Port 8080");

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

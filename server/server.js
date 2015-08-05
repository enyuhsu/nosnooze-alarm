var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var hat = require('hat');
var bcrypt = require('bcrypt-nodejs');
var superagent = require('superagent');

app.use(express.static('client'));

mongoose.connect('mongodb://anshyu:stustan@ds063809.mongolab.com:63809/student-auth-app', function(err) {
   if(err){ return err; }
   console.log('connected to DB');
});

var UserSchema = new Schema({
 username: { type: String, required: true, index: { unique: true } },
 password: { type: String, required: true},
 access_token: String
});
var User = mongoose.model('User', UserSchema);

app.use(bodyParser.json());
app.use(cookieParser());


app.get('/users', function(req, res){
	User.find(function(err, person){
		res.send(person);
	})
})

app.post('/register', function(req,res){
	bcrypt.hash(req.body.password, null, null, function(err,hash){
    	var user = new User({username:req.body.username, password:hash, access_token: hat()});
    	user.save();
    	res.sendStatus(200);
	});
});

app.post('/login', function(req, res){
		User.findOne({username: req.body.username}, function(err, data){
			if (err){
				return res.send(err);
			}
			bcrypt.compare(req.body.password, data.password, function(err, res2){
				if (res2){	
				res.send(data.access_token);
				}
			});
		});
});

app.post('/slack', function(req, response) {
	var message = req.body;
	superagent.post('https://hooks.slack.com/services/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').send(message).end(function(err,res){
		if (res.ok){
			console.log ("yay");}
		else {
			console.log(err);
		}
		response.status(200);
	}
)
});

app.listen(5000);

module.exports = app;
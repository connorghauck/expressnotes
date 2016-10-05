var express = require('express'); //this makes it require the express library
var bodyParser = require('body-parser'); //we now have access to body-parser module so we can parse the body.
//bodyParser provides us MIDDLEWARE functionality. it's going to take your request, get the request object with all of the raw data, then it is going to take the binary buffer and read it in, then convert it into a javascript object then put that javascript object into the body.
var path = require('path'); //this module is similar to http and is built into Node.


var app = express();//creates a new application



app.use(function(req, res, next){
    console.log('Got a request!');
    next();
});



app.use(bodyParser.urlencoded({extended: true})); //this returns a function that knows how to take a request, find a URL and put in body parameters then turn it into a javascript object for us.




app.post('/', function(req, res){
        console.log('req. body=', req.body);
        res.sendStatus(200);
});  //we're requesting the body, which we are currently sending the day = wednesday data to




app.get('/', function(req, res){  //route (GET, POST, ETC.) + path ('/' '/kittens') + handler ('function(){}')
    console.log('Received a request at ' + new Date());


    var filename = path.join(__dirname, 'public/views/index.html'); //__dirname is a global variable that represents the directory that this specific file lives in
    console.log('filename', filename);
    res.sendFile(filename);

//this basically takes the folder that index.html is in and then send index.html from that folder.

    //res.send('Hello world!'); //the response object is going to hav ea few methods associated with it, one of the most common being the send method.
});//telling express to listen specifically for get requests. first you need the path '/', then you tell it what to do once it gets the request
//this is a request and response set of parameters. the res is the response you are sending back to the client from the server.

app.get('/kittens', function(req, res){

    console.log('Query params:', req.query); //this will give us an object containing all query parameters associated with this particular request.
    if (req.query.age > 2){
        res.send('MEOW!');
    } else {
        res.send('meow');
    }
});

var songs = []; //create a variable called songs which we will eventually fill with songs, making it an empty array

app.post('/songs', function(req, res){
    console.log('req.body:', req.body);
    songs.push(req.body);
    console.log('songs', songs);

    res.sendStatus(200);
});

app.get('/songs', function(req, res){
    res.send(songs);
});

app.use(express.static('public')); //middleware for serving static files. static files = any files that don't change, their inner contents do not change while the server is running. generally the things we need on the client side
//this makes anything in that folder available


app.listen(3000); //makes the localhost:3000 work

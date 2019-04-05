const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3002;

var app = express();

// Handlebar Partials which let us to create reusable chunks of code like headers and footer 
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//     var now = new Date().toString();
//     var log = `${now}: ${req.method} ${req.url}`;

//     console.log('----------------LOGS-----------------\n', log);
//     fs.appendFileSync('server.log', log + '\n');
//     next();
// });

// node 7 or greater
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log('----------------LOGS-----------------\n', log);
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// This will be useful when you want to show maintenance work
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// Express middleware allows you to add on to the existing functionality that express has 
app.use(express.static(__dirname + '/public'));

// Handlebar helpers which is way to run some javascript code inside of handlebars templates
hbs.registerHelper('getCurrentYear', () => {
     return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my web site'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
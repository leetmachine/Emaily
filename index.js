const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); //this must come before ./services/passport because we are trying to use it in passport.
require('./services/passport'); //nothing is being exported so we do not need to assign a variable.


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app); //we are exporting a function from authRoutes, and then immediately call it with app as a parameter.
require('./routes/billingRoutes')(app);

//production specific code
if(process.env.NODE_ENV === 'production'){
    //Express will serve up production assets like main.js and main.css file
    app.use(express.static('client/build'));

    //Express will serve index.html file for routes it doesn't recognize suspects are for React Router
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const config = require('./config/config.json');

const recruiterAuthAPIs = require('./api/v1/recruiterAuth.js');
const jobSeekerAuthAPIs = require('./api/v1/jobSeekerAuth.js');

const jobSeekerFunctionalAPIs = require('./api/v1/jobSeeker.js');
const recruiterFunctionalAPIs = require('./api/v1/recruiter.js');

const app = express();
const port = config.application.port;

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views',__dirname+"/views");
app.use(express.static(__dirname+'/public'));

app.get("/", (req, res, next) => {
    res.render("pages/index.ejs",{msg:""});
});

app.get("/recruiterPortal", (req, res, next) => {
    res.render("pages/index.ejs");
});

app.use("/auth", jobSeekerAuthAPIs);
app.use("/recruiterPortal/auth", recruiterAuthAPIs);

app.use((req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];
        try {
            res.locals.loggedInUser = jwt.verify(token, config.application.signature).fetchedUser;
        }
        catch (err) {
            if (err == "JsonWebTokenError: invalid token") {
                return res.status(400).send("Please Don't Try Playing With Our Tokens Man. We have A check for it");
            }
            if (err == "TokenExpiredError: jwt expired") {
                return res.status(400).send("Can You Please Login Again");
            }

        }
        next();
    }
    else {
        res.status(404).send("You Seem To Be At A Wrong Place");
    }
});

app.use("/explore", jobSeekerFunctionalAPIs);
app.use("/recruiterPortal/explore", recruiterFunctionalAPIs);

app.use((req, res, next) => {
    res.status(404).send("You Took The Wrong Exit. No Such Endpoint");
});

app.listen(port, () => {
    console.log('Server started at port: ', port);
});
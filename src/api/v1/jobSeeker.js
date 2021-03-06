const router = require('express').Router();

const jobSeeker = require('../../services/jobSeeker.js');

router.get('/allJobs', async (req, res, next) => {
    try {
        console.log("USER", res.locals.loggedInUser);
        let loggedInUser = res.locals.loggedInUser;
        let allJobs = await jobSeeker.getEntireJobList();
        return res.status(200).render("pages/jobseeker.ejs", {title:"All Jobs" ,data: allJobs });
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({ success: false, message: "Caught Your Error. Check Your Server Logs \n" + err });
    }
});

// Get only with expr>= && profile
router.get('/jobsForMe', async (req, res, next) => {
    try {
        console.log("USER", res.locals.loggedInUser);
        let loggedInUser = res.locals.loggedInUser;
        let jobsForMe = await jobSeeker.getJobsForUser(loggedInUser);
        return res.status(200).render("pages/jobseeker.ejs", { title:"Jobs Curated For You",data: jobsForMe });
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({ success: false, message: "Caught Your Error. Check Your Server Logs \n" + err });
    }
});

router.get('/appliedJobs', async (req, res, next) => {
    try {
        console.log("USER", res.locals.loggedInUser);
        let loggedInUser = res.locals.loggedInUser;
        let jobsAppliedFor = await jobSeeker.getListOfAppliedJobs(loggedInUser);
        return res.status(200).render("pages/jobseeker.ejs", {title:"Jobs You Applied For",data: jobsAppliedFor });
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({ success: false, message: "Caught Your Error. Check Your Server Logs \n" + err });
    }
});

/* router.get('/applicationForJob', async (req, res, next) => {
    try {
        console.log("USER", res.locals.loggedInUser);
        let loggedInUser = res.locals.loggedInUser;
        console.log("Hi therer this is the query object",req.query);
        inputValidator.signingIn(req.query);
        let applyForJob = await jobSeeker.applyForJob(loggedInUser,req.query);
        return res.status(200).render("pages/jobSeeker/jobListing.ejs", {title:"Jobs You Applied For",data: jobsAppliedFor });
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({ success: false, message: "Caught Your Error. Check Your Server Logs \n" + err });
    }
}); */

module.exports = router;
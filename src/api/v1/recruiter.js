const router = require('express').Router();

const inputValidator = require('../../services/validations.js');
const recruiter = require('../../services/recruiter.js');
const config = require('../../config/config.json');


router.get('/jobsPostedByMe', async (req, res, next) => {
    try {
        console.log("USER", res.locals.loggedInUser);
        let loggedInUser = res.locals.loggedInUser;
        let jobsByMe = await recruiter.getJobsPostedByMe(loggedInUser);
        return res.status(200).render("pages/recruiter.ejs", { title: "Posted By Me", data: jobsByMe });
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({ success: false, message: "Caught Your Error. Check Your Server Logs \n" + err });
    }
});

router.post('/jobPosting', async (req, res, next) => {
    try {
        console.log("USER", res.locals.loggedInUser);
        let loggedInUser = res.locals.loggedInUser;
        inputValidator.submittingJobOpening(req.body);
        await recruiter.postAJob(loggedInUser,req.body);
        // Need to Test If this works because the token might miss in this case.
        // But it might even not miss due to it being in header now.
        return res.status(200).send("Saved Successfully");
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({ success: false, message: "Caught Your Error. Check Your Server Logs \n" + err });
    }
});

router.get('/listOfApplicants', async (req, res, next) => {
    try {
        inputValidator.gettingApplicants(req.query);
        let allJobs = await recruiter.getApplicantsForAJob(req.query);
        return res.status(200).send({data: allJobs});
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({ success: false, message: "Caught Your Error. Check Your Server Logs \n" + err });
    }
});

router.get('/listOfAllApplicants', async (req, res, next) => {
    try {
        inputValidator.gettingApplicants(req.query);
        let allJobs = await recruiter.getApplicantsForAJob(req.query);
        return res.status(200).send({title: "Posted By Me", data: allJobs,token:"" });
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({ success: false, message: "Caught Your Error. Check Your Server Logs \n" + err });
    }
});

router.get('/jobClosing', async (req, res, next) => {
    try {
        console.log("USER", res.locals.loggedInUser);
        let loggedInUser = res.locals.loggedInUser;
        let allJobs = await recruiter.closingJob();
        return res.status(200).json({ success: false, message: "Closed The Job With Id=", jobId });
        // return res.status(200).render("pages/.ejs", { title: "Posted By Me", data: allJobs });
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({ success: false, message: "Caught Your Error. Check Your Server Logs \n" + err });
    }
});

// router.get('/listOfApplicantsForAllMyJobs', async (req,res,next)=>{})

module.exports = router;
const router = require('express').Router();
const inputValidator = require('../../services/validations.js');
const jobSeeker = require('../../services/jobSeeker.js');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

router.post("/signIn", async (req, res, next) => {
    try {
        inputValidator.signingIn(req.body);
        let fetchedjobSeeker = await jobSeeker.signIn(req.body).email;
        let token = jwt.sign({ fetchedjobSeeker }, config.application.signature, { expiresIn: config.application.jwtexpiration });
        return res.status(200).render("pages/jobseeker/joblisting.ejs",{token:token})
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).send(err);
    }
});

router.post("/signUp", async (req, res, next) => {
    try {
        inputValidator.jobSeekerSigningUp(req.body);
        await jobSeeker.signUp(req.body);
        let msg='You have Successfully Signed Up Please Login To Continue';
        return res.status(200).redirect("/");
    }
    catch (err) {
        console.log("Caught This Error",err);
        if (err == "Unable To Create Your Account Right Now") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({success:false,message:"Caught Your Error. Check Your Console"});
    }
});

/* router.post("/logOut",async (req,res,next)=>{
    try {
        
        inputValidator.jobSeekerSigningUp(req.body);
        await jobSeeker.signUp(req.body);
        let msg='You have Successfully Signed Up Please Login To Continue';
        return res.status(200).redirect("/");
    }
    catch (err) {
        console.log("Caught This Error",err);
        if (err == "Unable To Create Your Account Right Now") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({success:false,message:"Caught Your Error. Check Your Console"});
    }
}); */

module.exports = router;
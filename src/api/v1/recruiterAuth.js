const router = require('express').Router();
const inputValidator = require('../../services/validations.js');
const recruiter = require('../../services/recruiter.js');
const config = require('../../config/config.json');

router.post("/signIn", async (req, res, next) => {
    try {
        inputValidator.signingIn(req.body);
        let fetchedRecruiter = await recruiter.signIn(req.body);
        let token = jwt.sign({ fetchedRecruiter }, config.application.signature, { expiresIn: config.application.jwtexpiration });
        return res.status(200).send({ "message": "You Are Now Logged In", "token": token });
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({success:false,message:"Caught Your Error. Check Your Server Logs \n"+err});
    }
});

router.post("/signUp", async (req, res, next) => {
    try {
        inputValidator.recruiterSigningUp(req.body);
        await recruiter.signUp(req.body);
        return res.status(200).redirect("/recruiterPortal");
    }
    catch (err) {
        console.log(err);
        if (err == "Unable To Create Your Account Right Now") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).json({success:false,message:"Caught Your Error. Check Your Server Logs \n"+err});
    }
});

module.exports = router;
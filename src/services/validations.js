const jobSeekerSigningUp = (input) => {
    if (JSON.stringify(input) === "{}") {
        throw "You Did Not Sent Any Data To Us";
    }
    if (!input.email) {
        throw "Email Missing";
    }
    if (!input.password) {
        throw "Password Missing";
    }
    if (!input.experience) {
        throw "Experience Missing";
    }
    if (!input.profile) {
        throw "Profile Missing";
    }
    if (input.password.length <= 3) {
        throw "Sorry Your Password Must Be Of More Than 3 Characters."
    }
    if (!input.confirmPassword) {
        throw "You Forgot To Confirm Your password";
    }
    if (input.password !== input.confirmPassword) {
        throw "Your Password's Do Not Match "
    }
}

const recruiterSigningUp = (input) => {
    if (JSON.stringify(input) === "{}") {
        throw "You Did Not Sent Any Data To Us";
    }
    if (!input.email) {
        throw "Email Missing";
    }
    if (!input.password) {
        throw "Password Missing";
    }
    if (!input.company) {
        throw "Company Name Missing";
    }
    if (input.password.length <= 3) {
        throw "Sorry Your Password Must Be Of More Than 3 Characters.";
    }
    if (!input.confirmPassword) {
        throw "You Forgot To Confirm Your password";
    }
    if (input.password !== input.confirmPassword) {
        throw "Your Password's Do Not Match";
    }
}

const signingIn = (input) => {
    if (JSON.stringify(input) === "{}") {
        throw "You Did Not Sent Any Data To Us";
    }
    if (!input.email) {
        throw "Email Missing";
    }
    if (!input.password) {
        throw "Password Missing";
    }
};

const submittingJobOpening = (input) => {
    if (JSON.stringify(input) === "{}") {
        throw "You Did Not Sent Any Data To Us";
    }
    if (!input.description) {
        throw "Description Missing";
    }
    if (!input.city) {
        throw "City Missing";
    }
    if (!input.profile) {
        throw "Company Name Missing";
    }
    if (!input.experience) {
        throw "Experience Missing";
    }
};

const gettingApplicants = (input) => {
    if (JSON.stringify(input) === "{}") {
        throw "You Did Not Sent Any Data To Us";
    }
    if (!input.jobId) {
        throw "JobId Missing";
    }
};

module.exports = {
    signingIn,
    recruiterSigningUp,
    jobSeekerSigningUp,
    submittingJobOpening,
    gettingApplicants
}
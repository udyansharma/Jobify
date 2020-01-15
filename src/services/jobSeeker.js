const bcrypt = require('bcrypt');

const databaseUtility = require('./database');

const signUp = (input)=>{
    return new Promise((resolve,reject)=>{
        let email = input.email;
        let password = input.password;
        let experience = input.experience;
        let profile = input.profile;
            bcrypt.hash(password,2,(err,hashedPassword)=>{
                if(err){
                    reject("Unable To Create Your Account Right Now");
                }
                databaseUtility.jobSeekerSignUp(email,hashedPassword,experience,profile).then((result)=>{
                    resolve();
                }).catch((err)=>{
                    reject(err);
                });
            })
    });
}

const signIn = (input)=>{
    return new Promise((resolve,reject)=>{
        let email = input.email;
        let password = input.password;
        databaseUtility.getJobSeekerDetails(email).then((result)=>{
            bcrypt.compare(password,result.password,(err,match)=>{
                if(err){
                    console.log(err);
                    reject("Server Error");
                }
                match? resolve(result.email):reject("Invalid Credentials");
            });
        }).catch((err)=>{
            reject(err);
        });
    });
}

const getEntireJobList = ()=>{
    return new Promise((resolve,reject) => {
        databaseUtility.getEntireJobList().then((result)=>{
            resolve(result);
        }).catch((err)=>{
            reject(err);
        })
    })
}

const getJobsForUser = (jobSeekerEmail)=>{
    return new Promise((resolve,reject) => {
        databaseUtility.getJobsForUser(jobSeekerEmail).then((result)=>{
            resolve(result);
        }).catch((err)=>{
            reject(err);
        })
    })
}

const getListOfAppliedJobs = (jobSeekerEmail)=>{
    return new Promise((resolve,reject) => {
        databaseUtility.getListOfAppliedJobs(jobSeekerEmail).then((result)=>{
            resolve(result);
        }).catch((err)=>{
            reject(err);
        })
    })
}

module.exports={signIn,signUp,getEntireJobList,getJobsForUser,getListOfAppliedJobs}
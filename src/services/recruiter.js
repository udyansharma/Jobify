const bcrypt = require('bcrypt');

const databaseUtility = require('../services/database');

const signUp = (input) => {
    return new Promise((resolve, reject) => {
        let email = input.email;
        let password = input.password;
        let company = input.company;
        bcrypt.hash(password, 2, function (err, hashedPassword) {
            if (err) {
                reject("Unable To Create Your Account Right Now");
            }
            databaseUtility.recruiterSignUp(email, hashedPassword, company).then((result) => {
                console.log(result);
                resolve();
            }).catch((err) => {
                reject(err);
            })
        })
    })
}
const signIn = (input) => {
    return new Promise((resolve, reject) => {
        let email = input.email;
        let password = input.password;
        databaseUtility.getRecruiterDetails(email).then((result) => {
            bcrypt.compare(password, result.password, (err, match) => {
                if (err) {
                    console.log(err);
                    reject("Server Error");
                }
                match ? resolve(result.email) : reject("Please Check Your Credentials");
            });
        }).catch((err) => {
            console.log(err);
            reject(err);
        })
    });

}
module.exports = { signIn,signUp }
const mysql = require('mysql');
const config = require('../config/config.json');
const env = process.env.NODE_ENV || "localEnv";
var pool;
try {
    pool = mysql.createPool(config[env].db);
}
catch (err) {
    console.log("Unable to create pool. Kindly check the db params");
}

const recruiterSignUp = (email, password, company) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT count(*) as user_check FROM recruiter_login where email=?', [email]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result[0].user_check != 0) {
                        reject("You Already Have This Id Registered With Us. Please Try Logging In");
                    }
                    else {
                        connection.query(mysql.format('INSERT INTO recruiter_login VALUES(?,?)'), [email, password], (err, result) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                connection.query(mysql.format('INSERT INTO recruiter VALUES(NULL,?,?)', [email, company]), (err, result) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve();
                                    }
                                });
                            }
                        })
                    }
                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
};

const jobSeekerSignUp = (email, password, experience, profile) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT count(*) as user_check FROM jobseeker_login where email=?', [email]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result[0].user_check != 0) {
                        reject("You Already Have This Id Registered With Us. Please Try Logging In");
                    }
                    else {
                        connection.query(mysql.format('INSERT INTO jobseeker_login VALUES(?,?)'), [email, password], (err, result) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                connection.query(mysql.format('INSERT INTO jobseeker VALUES(NULL,?,?,?)', [email, experience, profile]), (err, result) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve();
                                    }
                                });
                            }
                        })
                    }
                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });

};

const getJobSeekerDetails = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }

            connection.query(mysql.format('SELECT * FROM jobseeker_login where email=?', [email]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (!result[0]) {
                        reject("Sorry You Are Not A Registered User");
                    }
                    else {
                        resolve(result[0]);
                    }
                }

            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });

};

const getRecruiterDetails = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }

            connection.query(mysql.format('SELECT * FROM recruiter_login where email=?', [email]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (!result[0]) {
                        reject("Sorry You Are Not A Registered User");
                    }
                    else {
                        resolve(result[0]);
                    }
                }

            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });

};

const getEntireJobList = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT * FROM job'), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
};

const getListOfAppliedJobs = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT _id FROM jobseeker where email=?', [email]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let userId = result[0]._id;
                    connection.query(mysql.format('SELECT * FROM applications JOIN job ON applications.job_id = job.job_id where applicant_id =?', [userId]), (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    })
                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
};

const getJobsForUser = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT experience, profile FROM jobseeker where email=?', [email]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let userExp = result[0].experience;
                    let userProfile = result[0].profile;
                    connection.query(mysql.format('SELECT * FROM job where experience>=? AND profile=?', [userExp, userProfile]), (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    })
                }
            });
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
};

const applyForJob = (email, jobId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT _id from jobseeker WHERE email=?', [email]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let jobSeekerId = result[0]._id;
                    connection.query(mysql.format('INSERT INTO applications VALUES (?,?)', [jobId, jobSeekerId]), (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            connection.query(mysql.format('UPDATE job SET number_of_applicants=number_of_applicants+1'), (err, result) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve();
                                }
                            })
                        }
                    })

                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    })
};

const postAJob = (inputArray) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT _id from recruiter WHERE email=?', [inputArray[2]]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let recruiterId = result[0]._id;
                    inputArray[2] = recruiterId;
                    connection.query(mysql.format('INSERT INTO job VALUES (NULL,?,0,?,?,1,?,?)', inputArray), (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve()
                        }
                    })

                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    })
};

const getApplicantsForAJob = (jobId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT applications.job_id,jobseeker.email,jobseeker.profile,jobseeker.experience from applications JOIN jobseeker on jobseeker._id=applications.applicant_id  WHERE applications.job_id=?', [jobId]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if(result.length==0){
                        reject("No Applicants");
                    }
                    resolve(result);
                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    })
};

const getJobsPostedByRecruiter = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT _id from recruiter WHERE email=?', [email]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let recruiterId = result[0]._id;
                    connection.query(mysql.format('SELECT * FROM job WHERE posted_by=?', [recruiterId]), (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    })

                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    })
}


module.exports = {
    recruiterSignUp,
    jobSeekerSignUp,
    getJobSeekerDetails,
    getRecruiterDetails,
    getEntireJobList,
    getJobsForUser,
    getListOfAppliedJobs,
    applyForJob,
    getJobsPostedByRecruiter,
    postAJob,
    getApplicantsForAJob
}
# Jobify

Made as a part of a 2 day full stack challenge. I challenged myself to keep minimal views for ejs targeting minimal codebase and to imititate react at a very high level with XHR and dom manipulations instead of rendering new pages.

Although manipulating DOM is a costly affair but the implementation was a basic one and just a tryout.

How to run the app

In the root directory type: npm start

Things which are missing right now:

1) User names
2) Contact Numbers
3) Forgot Password
4) Checkbox for jobSeeker Type => Fresher / Exp.
5) Backend Check for email Regex
6) NodeMailer service upon sign up.
7) Current Organization Not Included.
8) Skills Not Included.
9) Flash Messages.
10) Job Seeker can still see the applied job again in the entire job list.
11) Proper logout i.e. token deletion or expiration from server side as well. Or basically switching to session.
12) Time of Posting A Job.
13) Experience at time of posting should be a range. While at user account creation it should be the same.
14) In token user id should have been returned, so that there is no need of doing extra queries to fetch it on the basis of email.
mysql -u root -proot<<delimiter
drop database IF EXISTS jobify;
create database jobify;

use jobify;

create table recruiter_login(email VARCHAR(255) PRIMARY KEY,password VARCHAR(255));
create table jobseeker_login(email VARCHAR(255) PRIMARY KEY,password VARCHAR(255));

create table job(job_id int AUTO_INCREMENT PRIMARY KEY, description TEXT NOT NULL,number_of_applicants int NULL,city VARCHAR(60),posted_by int,status VARCHAR(1), profile VARCHAR(70) , experience FLOAT(3,2) DEFAULT 0);
create table applications(job_id int, applicant_id int);

create table recruiter(_id int AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) , company VARCHAR(60));
create table jobseeker(_id int AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) , experience FLOAT(3,2) DEFAULT '0.00', profile VARCHAR(70));


delimiter

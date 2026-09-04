# Hackathon Spark

Hackathon Project Idea Recommendation Expert System – Complete Web Application

Create a modern, professional and responsive web application called “Hackathon Project Idea Recommendation Expert System”.

The application should have Login, Registration, Student Profile, Skill Selection, Expert System Recommendation, Project Details, Dashboard and Logout features.

Use:

HTML5

CSS3

JavaScript

LocalStorage for storing user login/profile data

No backend required

Create separate files: index.html, style.css, script.js

1. Application Flow

The complete application flow should be:

Login / Register
↓
Student Profile
↓
Dashboard
↓
Select Skills & Interests
↓
Expert System Analysis
↓
Recommended Hackathon Project
↓
Project Details
↓
Explore More Ideas
↓
Logout

2. Login Page

Create an attractive login page.

Display:

HACKATHON IDEA EXPERT

Subtitle:

“Find the right project for your skills and interests.”

Fields:

Email / Username

Password

Buttons:

Login

Create Account

Also include:

Remember Me checkbox

Forgot Password text

Link to Register page

Add a modern AI/hackathon themed illustration on the side.

For this demo application, use JavaScript and LocalStorage to handle login.

3. Registration Page

Create a student registration form.

Fields:

Full Name

Email

Password

Confirm Password

College Name

Department

Year of Study

Button:

Create Account

After successful registration, save the basic user information using LocalStorage and redirect to the Profile page.

4. Student Profile Page

After login, display a student profile.

Profile should contain:

Personal Information

Profile Picture

Full Name

Email

College Name

Department

Year of Study

Technical Skills

Allow the student to select:

Python

C++

Java

JavaScript

HTML/CSS

SQL

AI/ML

IoT

Cybersecurity

Cloud Computing

Areas of Interest

Allow multiple selections:

Artificial Intelligence

Web Development

Mobile Development

IoT

Cybersecurity

Cloud Computing

Data Science

Add:

Edit Profile
Save Profile

Store the profile information using LocalStorage.

5. Dashboard

After completing the profile, show a dashboard.

Display:

Welcome Message

“Welcome, [Student Name] 👋”

Profile Completion

Show a progress bar such as:

Profile Completion: 85%

Quick Statistics

Cards:

🎯 Skills Selected

💡 Project Ideas

🤖 Recommendations

🏆 Hackathon Ready

Main Button

Find My Hackathon Project

6. Expert System Questionnaire

Create a questionnaire based on the student's profile.

Questions:

Are you interested in Artificial Intelligence?

Do you know Python programming?

Are you interested in Web Development?

Do you like working with databases?

Are you interested in IoT and automation?

Are you interested in Cybersecurity?

Use attractive Yes/No buttons.

Add:

Get My Recommendation

7. Expert System Rules

Implement the recommendation using JavaScript.

Rules:

IF AI = Yes AND Python = Yes
    → AI Chatbot Project

ELSE IF Web Development = Yes AND Database = Yes
    → Smart College Management System

ELSE IF IoT = Yes
    → Smart Campus Monitoring System

ELSE IF Cybersecurity = Yes
    → Cybersecurity Awareness System

ELSE
    → Student Utility Application


The system should automatically analyze the student's answers and recommend the most suitable project.

8. Recommendation Result

Create an attractive result page.

Display:

🤖 Your Recommended Project

AI Chatbot Project

Why this project?

“You are interested in Artificial Intelligence and have Python knowledge, so an AI chatbot is a suitable project for your skill set.”

Display:

Technologies

Python

AI/ML

NLP

HTML

CSS

JavaScript

Difficulty

Intermediate

Suggested Features

Student FAQ chatbot

College information

Course information

Event information

AI-based question answering

Buttons:

View Project Details

Try Another Recommendation

9. Project Ideas Page

Create a page called Explore Project Ideas.

Organize projects by domain.

🤖 Artificial Intelligence

AI Chatbot

AI Study Assistant

Student Performance Predictor

🌐 Web Development

Smart College Management System

Online Event Management

Student Collaboration Portal

📡 IoT

Smart Campus Monitoring

Smart Classroom

Smart Energy Monitoring

🔐 Cybersecurity

Cybersecurity Awareness System

Phishing Awareness Platform

Secure Password Education Platform

☁️ Cloud

Cloud File Management System

Cloud-Based Student Portal

Cloud Attendance System

Each project should have:

Project name

Short description

Technology stack

Difficulty level

“View Details” button

10. Navigation Bar

After login, display a navigation bar containing:

Logo: Hackathon Idea Expert

Menu:

Dashboard

My Profile

Find Project

Project Ideas

My Recommendation

Logout

Make the navigation responsive for mobile.

11. Logout

When the user clicks Logout:

Clear the current login session

Redirect to the Login page

Do not delete the saved profile unless the user explicitly chooses to delete it

12. UI / Design

Make the application look like a real modern AI-powered student platform.

Use:

Modern dashboard

Gradient backgrounds

Glassmorphism cards

Rounded corners

Professional typography

Smooth animations

Hover effects

Progress bars

Icons

Responsive design

Clean spacing

Use different visual cards for:

🤖 AI
🌐 Web
📡 IoT
🔐 Cybersecurity
☁️ Cloud
📊 Data Science

The website should look suitable for a college hackathon project demonstration.

13. LocalStorage

Use browser LocalStorage to store:

Registered user

Login status

Student profile

Technical skills

Areas of interest

Questionnaire answers

Recommended project

When the student logs in again, automatically load their saved profile.

14. Important Requirement

Do not make this just a simple questionnaire.

It should feel like a complete Student Hackathon Project Recommendation Platform.

The final application should have:

Login → Register → Profile → Dashboard → Skills → Expert System → Recommendation → Project Details → Explore Ideas → Logout

Make all buttons and navigation links functional and ensure there are no broken pages or console errors.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1aa28703-84fa-42c5-9098-e67730637460).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

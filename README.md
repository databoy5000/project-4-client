# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #4: WoCRO
## World Crisis Response Organisation

by [Raphaëlle Charrier](https://github.com/RaphaelleC) and [Anthony Graham](https://github.com/databoy5000/).

WoCRO is an app for Help-seekers (governmental entities) and NGOs to log major world crises into one place to collaborate efficently on solving them.

![Homepage](./screenshots/Homepage.png)

## Contents

- [Project Brief](#project-brief)
- [Approach](#approach)
- [Technologies](#technologies-used)
- [Wireframes](#wireframes)
- [Responsibilities](#responsibilities)
- [Key Learnings](#key-learnings)
- [Achievements](#achievements)
- [Challenges](#challenges)
- [Conclusions](#conclusions)

## Project Brief

* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.

## Approach
To guarantee continuity during the project build, we established the following elements:
* To assure communications on a messaging app where we could write, talk, exchange resources and share screens.
* [Project Management Sheet](https://docs.google.com/spreadsheets/d/1g-ZKAiVj09dBAaLHXUu5pl-V6kxmzfIp10CzKzqRgqc/view): to document the project scope and all specifications to the app into a single shared space.

(Sample of the main specifications tab)
<center>
  <img src="./screenshots/PM_Specs.png" alt="App Specifications" width="700">
</center><br>

Then, we defined the following milestones:
1. Establish database collections, their relationships and validated diagram.
2. Define API endpoints.
3. Construct wireframes.
4. Build cycle
    - Task planning/coordinating
    - Code
    - Test
    - Fix errors
    - Push working feature to GitHub
5. Syle completed components/pages
6. Final tests to validate app flow and design finishing
7. Backend & Frontend deployment

During the <ins>build cycle</ins>, we worked our way linearly from the back-end to the front-end, clearly defining tasks (one or multiple complete features per task) between team members to work through them separately in order to have minimum overlap, avoiding merge conflicts and/or work being done twice.

## Technologies Used

### <ins>Back-end</ins>
<img alt="Python" src="https://img.shields.io/badge/python-%2314354C.svg?style=for-the-badge&logo=python&logoColor=white"/><br>
<img alt="DjangoREST" src="https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray"/><br>
<img alt="Postgres" src ="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>

#### Additional technologies:
* TablePlus
* pyjwt
* pipenv
* pylint
* DjangoREST camel case

### <ins>Front-end</ins>
<img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/><br>
<img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/><br>
<img alt="Bootstrap" src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white"/><br>
<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>

#### Additional technologies:
* SASS
* Axios
* Cloudinary
* React MapGL
* React MapGL Geocoder

## Project Planning Diagrams

### <ins>Flow Chart</ins>
Setting the flow chart allowed us to brainstorm our way from a few different ideas to a sustainable one, and allowing us to manage expectations during the build across the team.

<center><img src="./screenshots/Flow_Diagram.jpg" alt="Flowchart" width="600"></center>

### <ins>Entity Relationship Diagram</ins>
<center><img src="./screenshots/ERD.png" alt="ERD" width="600"></center>

### <ins>Wireframes</ins>
The wireframes include features which we thought could be part of our MVP. We quickly realised whilst working our way through the back end that we had to make things simpler to complete our MVP within the given deadline.

#### <center><ins>Homepage</ins></center>
<center><img src="./screenshots/WF_Homepage.jpg" alt="Homepage" width="400"></center>

#### <center><ins>Register Form</ins></center>
<center><img src="./screenshots/WF_Register.jpg" alt="Register Form" width="400"></center>

#### <center><ins>New Crisis Form</ins></center>
<center><img src="./screenshots/WF_HS_NEW_CRISIS_FORM.jpg" alt="New Crisis Form (Help-seekers)" width="400"></center>

#### <center><ins>NGO Dashboard</ins></center>
<center><img src="./screenshots/WF_NGO_Dashboard.jpg" alt="NGO Dashboard" width="400"></center>


## Responsibilities

### Back-end

### Front-end

### User Preferences

## Key Learnings

## Achievements

## Challenges

## Conclusions


# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #4: WoCRO
## World Crisis Response Organisation
 
by [Raphaëlle Charrier](https://github.com/RaphaelleC) and [Anthony Graham](https://github.com/databoy5000/).
 
WoCRO is an app for Help-seekers (governmental entities) and NGOs to log major world crises into one place to collaborate efficiently on solving them.
 
![Homepage](https://imgur.com/2fRpLOF.png)
 
## Live Demo, Useful Links
 
[<img alt="Live Demo" src="https://imgur.com/P2NkQ7Q.png" height="35px">](https://wocro.netlify.app/)
[<img alt="Follow databoy5000" src="https://imgur.com/QCKp4U4.png" height="35px">](https://github.com/login?return_to=%2Fdataboy5000)
[<img alt="Client Repository" src="https://imgur.com/XyaL8Dg.png" height="35px">](https://github.com/databoy5000/project-4-client)
[<img alt="Server Repository" src="https://imgur.com/rod7TG4.png" height="35px">](https://github.com/databoy5000/project-4-server)
 
 
## Contents
 
- [World Crisis Response Organisation](#world-crisis-response-organisation)
- [Live Demo, Useful Links](#live-demo-useful-links)
- [Contents](#contents)
- [Project Brief](#project-brief)
- [Approach](#approach)
- [Technologies Used](#technologies-used)
  * [<ins>Back-end</ins>](#-ins-back-end--ins-)
  * [<ins>Front-end</ins>](#-ins-front-end--ins-)
- [Project Planning Diagrams](#project-planning-diagrams)
  * [<ins>Flow Chart</ins>](#-ins-flow-chart--ins-)
  * [<ins>Entity Relationship Diagram</ins>](#-ins-entity-relationship-diagram--ins-)
  * [<ins>Wireframes</ins>](#-ins-wireframes--ins-)
- [Responsibilities](#responsibilities)
  * [<ins>Back-end (crises app)</ins>](#-ins-back-end--crises-app---ins-)
    + [1. Models](#1-models)
    + [2. URLs & Views](#2-urls---views)
    + [3. Serialization](#3-serialization)
  * [<ins>Back-end (jwt_auth)</ins>](#-ins-back-end--jwt-auth---ins-)
  * [<ins>Front-end</ins>](#-ins-front-end--ins--1)
    + [**1. Create Crisis Form**](#--1-create-crisis-form------crisiscreatejs---)
      - [`useEffect`](#-useeffect-)
      - [Handling nested changes](#handling-nested-changes)
      - [MapboxSearch and handling search results](#mapboxsearch-and-handling-search-results)
      - [Field validation and error handling](#field-validation-and-error-handling)
    + [**2. Edit Crisis form, Resources Create/Edit forms**](#--2-edit-crisis-form--resources-create-edit-forms--)
    + [**3. User dashboards**](#--3-user-dashboards--)
    + [**4. Show single Crisis page**](#--4-show-single-crisis-page--)
    + [**5. Homepage map**](#--5-homepage-map--)
    + [**6. Register & Login forms**](#--6-register---login-forms--)
- [Key Learnings, Achievements & Challenges](#key-learnings--achievements---challenges)
  * [<ins>Back-end</ins>](#-ins-back-end--ins--1)
  * [<ins>Front-end</ins>](#-ins-front-end--ins--2)
- [Conclusions](#conclusions)
 
## Project Brief
 
* **Build a full-stack application** by making your back-end and your front-end.
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database.
* **Consume your API with a separate front-end** built with React.
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut.
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
 
## Approach
To guarantee continuity during the project build, we established the following elements:
* To assure communications on a messaging app where we could write, talk, exchange resources and share screens.
* Having daily standups to keep track of the project's progress.
* [Project Management Sheet](https://docs.google.com/spreadsheets/d/1g-ZKAiVj09dBAaLHXUu5pl-V6kxmzfIp10CzKzqRgqc/view): to document the project scope and all specifications to the app into a single shared space.
 
(Sample of the main specifications tab)
<center>
 <img src="https://imgur.com/KgrkJt7.png" alt="App Specifications" width="700">
</center><br>
 
Then, we defined the following milestones:
1. Establish database collections, their relationships and validated diagram.
2. Define API endpoints.
3. Construct wireframes.
4. Build cycle;
  - Task planning/coordinating,
  - Code,
  - Test,
  - Fix errors,
  - Push working feature to GitHub.
5. Syle completed components/pages.
6. Final tests to validate app flow and design finishing.
7. Backend & Frontend deployment.
 
During the <ins>build cycle</ins>, we worked our way linearly from the back-end to the front-end, clearly defining tasks (one or multiple complete features per task) between team members to work through them separately to have minimum overlap, avoiding merge conflicts and/or work being done twice. This was all managed through the [Project Management Sheet](https://docs.google.com/spreadsheets/d/1g-ZKAiVj09dBAaLHXUu5pl-V6kxmzfIp10CzKzqRgqc/view)'s 'Tasks Board' tab.
 
For readability, we also set a template of naming conventions to follow (again, managed through the same document), which were also updated as we coded along when we figured certain syntaxes would need to follow the same form.
 
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
Setting the flow chart helped us to brainstorm our way from a few different ideas to a sustainable one, and allowing us to manage expectations during the build across the team.
 
<center><img src="https://imgur.com/cPNBjBt.png" alt="Flowchart" width="600"></center>
 
### <ins>Entity Relationship Diagram</ins>
<center><img src="https://imgur.com/pozpEPt.png" alt="ERD" width="600"></center>
 
### <ins>Wireframes</ins>
The wireframes include features that we thought could be part of our MVP. We quickly realised - whilst working our way through the back end - that we had to make things simpler to complete our MVP within the given deadline.
 
#### <center><ins>Homepage</ins></center>
<center><img src="https://imgur.com/SNPDQ5z.png" alt="Homepage" width="400"></center>
 
#### <center><ins>Register Form</ins></center>
<center>
 <img src="https://imgur.com/TwAjZ6r.png" alt="Register Form" width="400">
</center>
 
#### <center><ins>New Crisis Form</ins></center>
<center>
 <img src="https://imgur.com/qJdeykI.png" alt="New Crisis Form (Help-seekers)" width="400">
</center>
 
#### <center><ins>NGO Dashboard</ins></center>
<center>
 <img src="https://imgur.com/bL49IVX.png" alt="NGO Dashboard" width="400">
</center>
 
 
## Responsibilities
This project was a great team effort of bringing things together as a pair, but let's take a look at the elements which I configured...
 
### <ins>Back-end (crises app)</ins>
 
#### 1. Models
The following subclasses were matched with the ERD, inheriting from `Django.db.models.Model` class (to access the class's attributes for creating the database fields):
- Crisis
- Request
- Resource
- NGOResource
 
Some specific fields required to be channeled through a selection of values. The documentation recommended we implement the following to declare a list of available choices (e.g. `Crisis`):
```py
   TSUNAMI = 'Tsunami'
   HURRICANE = 'Hurricane'
   FLOOD = 'Flood'
   EARTHQUAKE = 'Earthquake'
   WAR = 'War'
   PANDEMIC = 'Pandemic'
   WILDFIRE = 'Wildfire'
 
   DISASTER_TYPES = [
       (TSUNAMI, 'Tsunami'),
       (HURRICANE, 'Hurricane'),
       (FLOOD, 'Flood'),
       (EARTHQUAKE, 'Earthquake'),
       (WAR, 'War'),
       (PANDEMIC, 'Pandemic'),
       (WILDFIRE, 'Wildfire')
   ]
 
   disaster_type = models.CharField(
       max_length=20,
       choices=DISASTER_TYPES,
   )
```
 
#### 2. URLs & Views
We followed the CRUD pattern to read all crises & single crisis, create, update and delete, for crises and NGO resources separately. Additionally, I personalised the backend by adding enpoints to serve specific tasks for better interaction continuity between the front & back ends. Let's take a look at the URLs:
 
```py
urlpatterns = [
   path('', CrisisListView.as_view()),
   path('types/', DisasterTypesListView.as_view()),
   path('<int:user_pk>/', UserCrisisListView.as_view()),
   path('crisis/<int:crisis_pk>/', CrisisDetailView.as_view()),
   path('request/<int:crisis_request_pk>/', RequestDetailView.as_view()),
   path('resources/', ResourceListView.as_view()),
   path('ngo_resources/<int:resource_pk>/', NGOResourceDetailView.as_view()),
   path('ngo_resources/', NGOResourceListView.as_view()),
]
```
Here is a condensed breakdown of the personalised URLs:
 
 - `DisasterTypesListView`: calls the custom `Crisis` model method `get_disaster_types()` to be used at the front-end's create & update forms. That way, the single point to amend - when more disaster types are added to the list - is the back-end's model list of choices.
 - `RequestDetailView`: updates a single existing crisis request. The front end form will only send a put request to updated request values.
 - `ResourceListView`: calls the list of resource values in the Resource model, with the same idea to optimize as the first point (scalability).
 
#### 3. Serialization
 
 - <ins>Write Crisis</ins>
 
We wanted to create a crisis within a single request (as opposed to multiple looped requests). That way, if there was an interruption during the **create** request, the crisis object wouldn't get validated and therefore keep the database clean from unfinished and/or duplicate objects.
 
To help understand the process, here is a diagram of the writable nested representation where:
 - Request: refers to the model for a resource request (such as medic, nurse, shelter, etc...).
 - **requests** (bold): refers to the crisis dictionary key named requests, which are resources 'requests'.
 - request (not bold): refers to HTTP client requests.
 
<center>
 <img src="https://imgur.com/ninITDZ.png" alt="Crisis Serializer" width="600">
</center>
 
 - <ins>Read Crisis</ins>
 
Separately, we raised a process for readable nested representations. The final serializer class where everything comes together is `ReadCrisisSerializer(CrisisSerializer)`. Here are the separate nesting compartments for a single crisis object:
 
A.  <ins>User</ins>: outputting fields `('id', 'username', 'profile_picture_url')`. e.g:
```json
 "owner": {
   "id": 2,
   "username": "hs1",
   "profilePictureUrl": "fake url"
 }
```
B.  <ins>Resource & Request</ins>: where a Resource is nested in a Request. In this current app version, there are 10 resources, therefore 10 requests for each of these resources, combined in a list.
```json
 "requests": [
   {
     "id": 41,
     "quantity": 10,
     "resource": {
       "id": 1,
       "resourceType": "Human",
       "resourceName": "Doctor"
     }
   },
   ...
 ]
```
C.  <ins>Crisis</ins>: outputting all fields of a crisis. e.g:
```json
{
 "id": 5,
 "disasterType": "Tsunami",
 "isSolved": false,
 "longitude": "-18.605467",
 "latitude": "64.997588",
 "placeName": "Iceland",
 "country": "Iceland",
 "disasterDescription": "big waves",
 "placeType": "country"
}
```
 
Here's the selection of only the serializer classes that are taking part in this process.
```py
class UserSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ('id', 'username', 'profile_picture_url')
 
class RequestSerializer(serializers.ModelSerializer):
   class Meta:
       model = Request
       fields = ('id', 'quantity', 'resource')
 
class ReadResourceSerializer(serializers.ModelSerializer):
   class Meta:
       model = Resource
       fields = '__all__'
 
class CrisisSerializer(serializers.ModelSerializer):
   class Meta:
       model = Crisis
       fields = '__all__'
 
class PopulatedReadRequestSerializer(RequestSerializer):
   resource = ReadResourceSerializer()
 
class ReadCrisisSerializer(CrisisSerializer):
   requests = PopulatedReadRequestSerializer(many=True)
   owner = UserSerializer()
```
 
 - <ins>NGOResource</ins>
 
An NGOResource is constructed the same way as a crisis Request, with the added NGO user's ID.
 
```py
class ReadResourceSerializer(serializers.ModelSerializer):
   class Meta:
       model = Resource
       fields = '__all__'
 
class NGOResourceSerializer(serializers.ModelSerializer):
   class Meta:
       model = NGOResource
       fields = '__all__'
 
class PopulatedNGOResourceSerializer(NGOResourceSerializer):
   ngo_user = User()
   resource = ReadResourceSerializer()
```
Here's what it outputs:
```py
[
 {
   "id": 1,
   "resource": {
     "id": 1,
     "resourceType": "Human",
     "resourceName": "Doctor"
   },
   "quantity": 200,
   "ngoUser": 3
 },
 ...
]
 ```
 
### <ins>Back-end (jwt_auth)</ins>
 
There were a few additional customisations that I thought would be good to have on the `jwt_auth` app, from a user experience's point of view, but also to make the code simpler to handle and more robust (avoiding form validation for specific fields on the front end).
 
 - <ins>Country validation</ins>
 
Since we had two user types using the same User model, but where we wanted the `country` field to be required for Help-seeker users, and not required for NGO users, the first step was the make the field at model level `blank=True`, then we added a custom field-level validation in the `UserSerializer`.
 
On field level serializer validation, you can access other keys from the HTTP client request with `self.initial_data['user_type']`. That way, we could set up a conditional to validate the country, based on the user type. Here's a snippet:
 
```py
   def validate_country(self, value):
       user_type = self.initial_data['user_type']
 
       if (user_type == 'Help-seeker') and (not value or value == ''):
           raise ValidationError('This field may not be blank.')
 
       return value
```
 
 - <ins>Loging user at registration</ins>
 
For this, in the `RegisterView(APIView)`, we created the method `new_user_token(self, new_user)` which outputs a 7-day expiry token in the registration's response to `setToken()` in the front-end, which has the user logged directly at registration and pushed to its respective dashboard.
 
### <ins>Front-end</ins>
 
For continuity, we decided to stick at the front-end with the features we built in the back-end.
 
In general, components support the following standard configuration:
- updating states with the `useState()` hook to declare variables storing data (e.g. HTTP client responses, primitive data and structural types).
- `useEffect()` for http client async requests to the back-end enclosed in try/catch blocks.
- handle page loading > errors > data display using conditionals.
- returning React elements using JSX.
- when a component contains a form, `useForm.js` hook is used and when necessary (usually forms with nested data), form structures are set and exported from `defaultForms.js`.
 
Additional elements can be found in components such as:
- handling nested changes, form submissions, error forms (back-end error handling) and/or results from a 3rd party API.
- `useHistory()` hook to navigate the user to a specific page after performing a form submission.
- `useParams()` hook to return a key/value pair from URL parameters. Say, in `Apps`, we had a  route `<Route path="/crises/:crisisId" component={CrisisShowHS}/>`, the `crisisId` is retrieved destructuring the property from `useParams()` like so: `const { crisisId } = useParams()`.
 
Let's take a look at the components that I worked on, in more detail.
 
#### **1. Create Crisis Form** ( `CrisisCreate.js` )
 
##### `useEffect`
In `useEffect`, there are x2 fetches from the backend:
- to get the disaster type selection from the Crisis model (e.g. tsunami, flood, etc...)
- to get the resources selection from the Resource model (e.g. doctor, nurse, shelter, etc...). Resources are then filtered into the x2 current types (human, material)
 
That way, each of the fetched data chunks (incl. the filtered elements) are passed into individual updated states (disasterTypes, humanResources, materialResources).
 
##### Handling nested changes
The behaviour we were looking for was to update individual field changes for resource requests (`formData.requests`) using the `<input>` attribute `onChange={handleNestedChanges}`. Important to note that each input's ID is given the resource's ID.
 
That way, on changes, the thread would loop through the `formData.requests` until `e.target.id` equals the correct position to update the `formData`'s state with the new quantity value (e.g. 5 doctors, 10 nurses, etc...):
```js
 const requestsCopy = [ ...formData.requests ]
 requestsCopy[i]  = { ...requestsCopy[i], quantity: e.target.value }
 setFormData({ ...formData, requests: requestsCopy })
```
 
##### MapboxSearch and handling search results
 
MapboxSearch is a standalone component that could've been hardcoded directly into `CrisisCreate.js`, but for readability, it made more sense to have it separate. Simply put, here are the main moving parts:
- The viewport object has an initial set of values. Any changes are handled by `handleViewportChange`.
- ReactMapGl: returns Mapbox’s map.
- Geocoder: returns Mapbox’s search bar result.
 
##### Field validation and error handling
Error handling occurs when a form submission is attempted. If the back-end responds with errors, the `formErrors` object state is updated with the relevant error messages to their respective properties and bootstrap's `is-invalid` class is added to the relevant input adding to it a red coloured glowing border.
 
Then, arbitrarily assuming that when an input loses focus ( `onBlur={handleFormError}` ) a change has occurred, `formError`'s respective property is set to back to blank and bootstrap's `is-invalid` class is removed.
 
#### **2. Edit Crisis form, Resources Create/Edit forms**
These roughly follow the same structure, with their tweaks and intricacies.
 
Where it differs for Edit forms is where we generally used the attribute `defaultValue` to set the initial value with the unchanged data coming from the app's database, and with `onChange`, updating the form's state with the new value changed by the user.
 
At last, because Edit forms were part of our stretch goals, they were coded after our MVP was completed, from both the back and front end perspectives. To make `PUT` requests simpler and faster to implement, instead of requesting a single object update with nested data (containing all changed and/or unchanged values at once), only the resources values which sustained a change from their default value, are updated <ins>in a FOR loop</ins>.
 
Because of this, resources will be stored back into the database in most recent order. Therefore, they are sorted back, always in the same manner, with the following `sort()` method:
```js
 const sortedNGOResources = sanitizedNGOResources.sort((a, b) => {
   return a.resource.id - b.resource.id
 })
```
 
#### **3. User dashboards**
 
(Example of an NGO account Dashboard)
<img src="https://imgur.com/2czAGC3.png" alt="NGO Dashboard">
 
Initially, it seemed simpler to create one dashboard with conditionals to show/hide certain elements, depending on the user type (Help-seeker or NGO) since they shared similar elements. The assumption was that since they were sharing elements, it would be faster to code and simpler to manage into a single component. But it quickly turned out to not provide much value as conditionals were restraining the flow.
 
The `NGODashboard.js` contains all the elements of the `HSDashboard.js` (with a few added features and differences), so let's take a look at this one only.
 
First, there are x3 dashboard states to manage:
1. When a user has just registered, it wouldn't have logged its available resource, therefore will only show the child component `ResourcesCreate.js` to create its resources, like so:
```js
 {typeof isNGOResources === 'boolean' &&
   !isNGOResources &&
   <ResourcesCreate />
 }
```
2. Then, it would show the current dashboard, but with no data to display when the user has logged its resources but there are no crises registered on the database.
3. Finally, it would show a fully-fledged dashboard when the user has logged its resources and there are crises registered on the database.
 
When crises are available in the database, they are collected in the response and modified with the following properties:
1. `crisis.canHelp: boolean` which is `true` when the NGO is a match to help a crisis (given that all NGO resources >= crisis resource request)
2. `crisis.dotColour: string` which can be either of 'green-dot', 'red-dot' or 'blue-dot' depending on a x2 stage conditional;
   - the first being if `crisis.canHelp === true`, `crisis.dotColour === 'green-dot'`, else `crisis.dotColour === 'red-dot'`,
   - the second being if the current crisis is selected, `crisis.dotColour === 'blue-dot'`.
   - the `crisis.dotColour` value will be passed into map markers `className` which will be identified in the CSS code to change the marker's colour.
3. x3 updated states are being set:
 - `crises`: all the database crises.
 - `filteredCrises`: filters crises if `crisis.canHelp: true`.
 - `displayCrises`: the crises being displayed on the map, based on the radio button's filter choice to either show all crises (state: `crises` ) or only show filtered crises (state: `filteredCrises` ).
 
At last, there is the MapGL child component which displays the map and its markers, where props are passed into such as:
- `crisesData` taking in the crises to display ( `displayCrises` ),
- `selectedCrisisId` taking in the `crisisId` which the user has selected,
- `homepageViewport` taking in the current viewport information which resizes the map when the window size gets changed by the user.
 
#### **4. Show Single Crisis page**
 
(Example of a Single Cris page)
<img src="https://imgur.com/Y4Tc1dy.png" alt="Single Crisis page">
 
This page has many similarities with the `CrisisCreate.js` page, where it only displays a single crisis. The viewport is set with the function `defaultViewport` which manually sets the map's `zoomValue` depending on the `placeType` recorded when creating a crisis. Here is a snippet of the conditionals:
```js
 if (placeType === 'country') zoomValue = 6
 if (placeType === 'region') zoomValue = 7
 if (placeType === 'postcode') zoomValue = 8
 if (placeType === 'district') zoomValue = 9
 ...
```
 
#### **5. Homepage map**
Refactored its hardcoded map to the child component `MapGLHomepage.js`, adding customized markers and the popup window functionality.
 
#### **6. Register & Login forms**
Here I worked on the conditionals when a form submission returns validation errors from the backend, to display the error messages, to have the input borders glowing in red and to remove the border colour `onBlur`, similar to validations on `createCrisis.js` and other forms.
 
## Key Learnings, Achievements & Challenges
 
In broad terms, although we managed to deliver a fully working MVP within the given timeline, we hadn't measured the scale of complexity of our initial MVP's included features. With the help of our instructor, we manage to strip it down to a simpler, more realistic version (and a much simpler ERD), which yet still required us to compensate with a great amount of extra work.
 
This exercise being an educational project, my objective was to aim for the better programmatic choices as opposed to the quickest ones, the reason being that I wanted to get the most value out of this course and my instructor’s knowledge. By no means do I believe they were the best, but I am confident that they fulfilled my objectives. I can also appreciate that in a professional/commercial environment, the choices that I made may not be suitable for an agile environment where delivery can be a priority over optimisation.
 
### <ins>Back-end</ins>
Although I wasn't comfortable with Django, I'm really glad we set ourselves tasks with nested/populated serializers and custom validations. It was a great learning curve that helped me explore the Django rest framework and solidify my knowledge of it.
 
I realised a little late that having NGO resources as a separate Django app would've improved readability. There was no semantic and/or functional point having these elements in the crisis app.
 
From the User model point of view, I also learnt how to use custom fields & object-level validation which I think is a great tool when having to conditionally validate models depending on the user type.
 
Overall, the back-end build took us just as long (if not longer) as the front-end's. I can appreciate that a well-built foundation of the back-end can simplify the front-end work making it seamless.
 
### <ins>Front-end</ins>
 
Initially, we planned to use single components incorporating conditionals to display data depending on the user type (Help-seeker or NGO). It became complex to manage and didn't provide value (neither to the user, neither to developing the app) so we separated components per user type (e.g. dashboards, single crisis pages), as well as some child components (e.g. MapGL & MapGLHomepage) which weren't exploited the same way from a parent component to another.
 
Overall, this was a great exercise to keep practising states, effects, passing props to/from components, exploring 3rd party documentation, handling forms, input objects and playing with their attributes. Additionally, it helped in making choices whether to build/amend code in the front or back end for short/long term solutions.
 
## Conclusions
 
To me, the final takeaway of this project and the whole course is that the learning curve was steep, but with patience and spending more time on problems helped me to greater progress with technologies which I was not comfortable working with initially, and to build strong foundations (skills and mindset) for the long term. I value a lot being surrounded by a mentor (and/or [StackOverflow](https://stackoverflow.com/)) and I believe that our instructor & teaching assistants gave us some great tools and supervision which helped to gain confidence in building our portfolio projects.
 
I can appreciate how planning is such an important part of developing products. Experience and practice will help me define more realistic goals. If you read this far, I'd appreciate hearing your thoughts on that last point.

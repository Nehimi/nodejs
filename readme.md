This project is for the tutorial of intro backend

Connecting a MongoDB Atlas cluster for project->create a .env file!->.env is whre we safley store sensetive stuff like your DB password so it is not hardcoded in the code.
it is invisible to git if listed in .gitignore


constants.js
This file stores and shares important values(like your database name) so you can use them easly in d/t parts of backend.

app.js

set up your express app(framwork)

db.js

it is connects your bacckend to the database

index.js

starts your server


Route is the addres  like as the adress book  
Routers check the aaddres (Url path) and method(GET,POST,etc)
 
 controller

 does the task (fetching,saving,deleting etc)
 asked in the request


let us explean how the request flow through an app-Journy of requests
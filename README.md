# CodeChat

A real-time chat application & game inspired by the popular quarantine game Story Chat, where players send lines of code one by one at a time, creating a snippet of optionally functioning code together! Unlimited players :D

# Tools

- Client, Front-End: React.js
- Server, Back-End: Node.js as web server, Express.js as web framework
- Database: MongoDB

# Purpose:

Practice Concepts Related But Not Limited To:

- React: constructing reusable components, virtual DOM, hooks
- Node: managing APIs, connecting front-end with DB, Node Package Manager
- Express: constructing routing APIs
- MongoDB: defining mongoose models, schemas, using mongoose to translate objects in code and the representation of those objects in MongoDB
- CRUD Operations (HTTP Methods) using RESTful API, JWT, BCrypt, Authorization, Testing APIs with Postman, etc.

# Basic Data Flow

In simplified terms:
React.js i.e. front-end &rarr; sends a request to fetch all chats from our DB (GET i.e. /api/chat) to the web framework i.e. Express.js &rarr; sends to Node.js i.e. the web server &rarr; uses mongoose to connect to MongoDB and makes a query to the DB, which compiles the query and sends the query back to the Node.js i.e. web server &rarr; Express.js i.e. web framework &rarr; sent back to React.js in form of JSON

# Important Note

Current Features:

- Chatting in real-time: one-on-one and group chats, login and signup with name, email, picture, search users, create chat and group chats, view profile and view other users' profiles

WIP: compiling and appending chat history to get runnable code, creating toast to display code snippet ideas, etc.

# Demo & Sample Endpoints
<img width="1263" alt="Screen Shot 2022-01-10 at 9 40 14 PM" src="https://user-images.githubusercontent.com/68135908/149277196-8eeeb8ae-2024-4e43-bc38-36f9acd03e10.png">
<img width="1260" alt="Screen Shot 2022-01-10 at 9 42 52 PM" src="https://user-images.githubusercontent.com/68135908/149277200-61c13755-c664-45fb-9921-2791e3c15fee.png">
<img width="1267" alt="Screen Shot 2022-01-10 at 9 43 32 PM" src="https://user-images.githubusercontent.com/68135908/149277202-d1d39916-f7e1-4e5b-a520-095278fb781f.png">
<img width="1261" alt="Screen Shot 2022-01-10 at 9 43 45 PM" src="https://user-images.githubusercontent.com/68135908/149277205-085ddc8c-10d8-4bad-98d3-d0fa41ffd413.png">
<img width="1282" alt="Screen Shot 2022-01-10 at 9 44 38 PM" src="https://user-images.githubusercontent.com/68135908/149277209-77330b48-d176-4976-ab57-c314ae04e2bb.png">
<img width="1282" alt="Screen Shot 2022-01-10 at 9 45 07 PM" src="https://user-images.githubusercontent.com/68135908/149277211-e6f9636f-6d69-41e4-8fcd-9ed507fc2c0c.png">
<img width="1276" alt="Screen Shot 2022-01-10 at 9 45 36 PM" src="https://user-images.githubusercontent.com/68135908/149277213-6ef8c1f7-06f1-4acc-a3b9-87ec2a81d45d.png">

# Run Locally

`git clone https://github.com/maaxkimm/codechat`
`cd codechat`
`npm install`
`cd frontend`
`npm install`
`npm start`
`cd frontend`
`npm start`

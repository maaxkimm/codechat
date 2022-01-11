# CodeChat

A real-time chat application & game inspired by the popular quarantine game Story Chat, where players send lines of code one by one at a time, creating a snippet of optionally functioning code together!

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
React.js i.e. front-end --> sends a request to fetch all chats from our DB (GET i.e. /api/chat) to the web framework i.e. Express.js --> sends to Node.js i.e. the web server --> uses mongoose to connect to MongoDB and makes a query to the DB, which compiles the query and sends the query back to the Node.js i.e. web server --> Express.js i.e. web framework --> sent back to React.js in form of JSON

# Small Note

WIP: compiling and appending chat history to get runnable code

# Run Locally

`git clone https://github.com/maaxkimm/codechat`
`cd codechat`
`npm install`
`cd frontend`
`npm install`
Start Server
`npm start`
`cd frontend`
Start Client
`npm start`

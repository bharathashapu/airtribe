#News Aggregator API

Use node src/app.js to run the application

Schema
{
    fullName: String,
    email: Email,
    password: String,
    preferneces: {
        category: [String],
        sources: [String]
    }
}

POST /register => Register a new user

POST /signin => Login as User and get Token to access all end-points

/preferences 
GET => Get preferences of logged in User
PUT => Updates preferences of logged in User

GET /news => Gets News from API based on the preferences
# Task Manager API

It peforms the CRUD on Tasks based on the below methods and end-points

GET /tasks: Retrieve all tasks available in the tasksInfo.json File.

GET /tasks/:id: Retrieve a single task by its ID from tasksInfo.json File.

POST /tasks: Create a new task based on title, description and completion status(which should be in boolean), It creates unique id by date based on the timestamp. Validation validates if the data is given for every required field

PUT /tasks/:id: Update an existing task by its ID (timestamp) and writes on to tasksInfo.json file. Validation checks for atleast one value given from title, description and completion status and also checks if the completion status is given as boolean or not.

DELETE /tasks/:id: Delete a task by its ID and updated the tasksInfo.json file.
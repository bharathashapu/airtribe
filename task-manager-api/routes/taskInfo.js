const taskRoutes = require('express').Router();
const taskData = require('../tasksInfo.json');
const bodyParser = require('body-parser');
const path = require('path');
const validator = require('../helpers/validator');
const fs = require('fs');

taskRoutes.use(bodyParser.json());

taskRoutes.get('/', (req, res) => {
    return res.status(200).json(taskData.tasks);
});

taskRoutes.get('/:id', (req, res) => {
    let tasksInfo = taskData.tasks;
    let taskIdPassed = req.params.id;
    let result = tasksInfo.filter(val => val.taskId == taskIdPassed);

    if (result == null || result == undefined || result.length == 0) {
        return res.status(404).json({"message": "Data not found" });
    }
    return res.status(200).json(result);
});

taskRoutes.post('/', (req, res) => {
    const taskDetails = req.body;
    if (validator.validateTaskInfo(taskDetails, taskData).status) {
        taskDetails.taskId = new String(Date.now());
        let writePath = path.join(__dirname, '..', 'tasksInfo.json');
        let taskDataModified = JSON.parse(JSON.stringify(taskData));
        taskDataModified.tasks.push(taskDetails);
        try {
            fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf-8', flag: 'w' });
            res.status(200)
            res.json(validator.validateTaskInfo(taskDetails, taskData));
            return res;
        }
        catch (err) {
            return res.status(500).json({ "message": "Write has failed we are sorry, Please try again later" });
        }
    }
    else {
        return res.status(400).json(validator.validateTaskInfo(taskDetails, taskData));
    }
});

taskRoutes.put('/:id', (req, res) => {
    let taskEditId = req.params.id;
    const taskDetails = req.body;
    let writePath = path.join(__dirname, '..', 'tasksInfo.json');
    let taskDataModified = JSON.parse(JSON.stringify(taskData));

    let validationResponse = validator.validateTaskEditInfo(taskDetails, taskData);
    if (validationResponse.status) {
        for (let i = 0; i < taskDataModified.tasks.length - 1; i++) {
            if (taskDataModified.tasks[i].taskId == taskEditId) {
                if (taskDetails.hasOwnProperty('title')) {
                    taskDataModified.tasks[i].title = taskDetails.title;
                }
                else if (taskDetails.hasOwnProperty('description')) {
                    taskDataModified.tasks[i].description = taskDetails.description;
                }
                else if (taskDetails.hasOwnProperty('completionStatus')) {
                    taskDataModified.tasks[i].completionStatus = taskDetails.completionStatus;
                }
            }
        }
        try {
            fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf-8', flag: 'w' });
            res.status(200)
            res.json(validationResponse);
            return res;
        }
        catch (err) {
            return res.status(500).json({ "message": "Write has failed we are sorry, Please try again later" });
        }
    }
    else {
        return res.status(400).json(validationResponse);
    }
});

taskRoutes.delete('/:id', (req, res) => {
    let taskDeletionId = req.params.id;
    let writePath = path.join(__dirname, '..', 'tasksInfo.json');
    let taskDataModified = JSON.parse(JSON.stringify(taskData));

    let deleteFlag = false;
    for (let i = 0; i < taskDataModified.tasks.length - 1; i++) {
        if (taskDataModified.tasks[i].taskId == taskDeletionId) {
            taskDataModified.tasks.splice(i,1);
            deleteFlag = true;
        }
    }

    if (deleteFlag) {
        try {
            fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf-8', flag: 'w' });
            res.status(200)
            res.json({"message": "Task with ID "+taskDeletionId+" has been successfully deleted" });
            deleteFlag = false;
            return res;
        }
        catch (err) {
            return res.status(500).json({ "message": "Write has failed we are sorry, Please try again later" });
        }
    }
    else {
        res.status(404);
        res.json({"message": "Task with ID "+ taskDeletionId +" not found" });
        return res;
    }
});

module.exports = taskRoutes;
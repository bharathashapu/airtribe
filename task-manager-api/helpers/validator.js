class validator {
    static validateTaskInfo(taskInfo, taskData) {
        if (taskInfo.hasOwnProperty('title') &&
        taskInfo.hasOwnProperty('description') &&
        taskInfo.hasOwnProperty('completionStatus') && typeof taskInfo.completionStatus === "boolean")  {
            return {
                "status": true,
                "message": "Task has been added successfully"
            };
        }

        if (typeof taskInfo.completionStatus !== "boolean") {
            return {
                "status": false,
                "message": "Completion Status should be a boolean value i.e., either true or false"
            };
        }

        return {
            "status": false,
            "message": "Task Info is malformed, please provide all the properties"
        };
    }

    static validateTaskEditInfo(taskInfo, taskData) {
        if (taskInfo.hasOwnProperty('title') ||
        taskInfo.hasOwnProperty('description') ||
        (taskInfo.hasOwnProperty('completionStatus') && (typeof taskInfo.completionStatus === "boolean")))  {
            return {
                "status": true,
                "message": "Task has been edited successfully"
            };
        }
        else if (taskInfo.hasOwnProperty('completionStatus') && (typeof taskInfo.completionStatus !== "boolean")) {
            return {
                "status": false,
                "message": "Completion Status should be a boolean value i.e., either true or false"
            };
        }

        return {
            "status": false,
            "message": "Task Info is malformed, please provide correct properties"
        };
    }
}

module.exports = validator;
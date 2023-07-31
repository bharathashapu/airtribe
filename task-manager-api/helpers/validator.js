class validator {
    static validateTaskInfo(taskInfo) {
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
            "message": "Task Info is malformed, please provide all (title, description and completionStatus) the properties"
        };
    }

    static validateTaskEditInfo(taskInfo) {
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
            "message": "Task Info is malformed, please provide one of the properies to update the task title, description and completion status"
        };
    }
}

module.exports = validator;
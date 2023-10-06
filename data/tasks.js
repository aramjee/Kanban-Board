import { ObjectId } from "mongodb";
import { tasksCollection } from '../config/mongoCollections.js';


const TaskStatus = { // Enum variable
    Todo: "todo",
    Doing: "doing",
    Done: "done"
}

// Create task, getAll task, delete task, getOnebyID, upDate task
const create = async (
    title
) => {

    const newTask = {
        title: title.trim(),
        status: TaskStatus.Todo // set initial status to do
    };

    const tasksDBConnection = await tasksCollection();
    const insertInfo = await tasksDBConnection.insertOne(newTask);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) { // response object for mongoDB
        throw `Error: Create task failed`;
    }
    console.log('Newly created task: ', insertInfo);
    const newId = insertInfo.insertedId.toString();

    return newId;
};

const getAll = async () => {
    const tasksDBConnection = await tasksCollection();
    let tasksList = await tasksDBConnection.find({}).toArray();
    tasksList = tasksList.map((element) => {
        element._id = element._id.toString();
        return element;
    });
    return tasksList;
};

const update = async (taskId, task) => {
    const tasksDBConnection = await tasksCollection();

    const updateInfo = await tasksDBConnection.findOneAndUpdate(
        { _id: new ObjectId(taskId.trim()) },
        {
            $set: {
                status: task.status
            }
        },
        { returnDocument: 'after' }
    );

    if (updateInfo.lastErrorObject.n === 0)
        throw [404, `Error: Update failed, task not found ${taskId}`];

    return updateInfo.value;

}

const remove = async (taskId) => {
    const tasksDBConnection = await tasksCollection();
    const deleteInfo = await tasksDBConnection.findOneAndDelete(
        { _id: new ObjectId(taskId.trim()) }
    );
    if (deleteInfo.lastErrorObject.n === 0) {
        throw [404, `Error: Could not delete task with Id ${taskId}`];
    }
    return {
        "taskId": taskId,
        "deleted": true
    };
}

export const tasksDataFunctions = { getAll, create, TaskStatus, update, remove }

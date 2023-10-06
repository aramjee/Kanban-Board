import { Router } from 'express';
import { tasksData } from '../data/index.js';
import { isValidDate, checkValidDate, checkObjectId } from '../utils/validation.js'

const router = Router(); // invoke router

router.route('/').get(async (req, res) => {
    try {
        let allTasks = await tasksData.getAll();
        //console.log(allTasks);
        let tasks = { 'todo': [], 'doing': [], 'done': [] };
        allTasks.forEach(task => {
            if (task.status === tasksData.TaskStatus.Todo) {
                tasks.todo.push(task);
            }
            else if (task.status === tasksData.TaskStatus.Doing) {
                tasks.doing.push(task);
            }
            else if (task.status === tasksData.TaskStatus.Done) {
                tasks.done.push(task);
            }
        });
        return res.status(200).render('main', { tasks: tasks }); // when rendering page need to pass dynamic values (object) to templating engine handlebars
        //res.status(200).json(allTasks) this is just to test
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


router.route('/create').post(async (req, res) => {
    try {
        let { title } = req.body;
        console.log('Return title', title);
        if (!title) throw new Error('Title is missing or needs to be in correct format.');
        let taskId = await tasksData.create(title)
        return res.status(200).redirect('/');
    } catch (e) {
        console.log('error', e)
        res.status(500).json({ error: e });
    }
});

// Update the status of a task
router.route('/updateStatus/:taskId/:status').put(async (req, res) => {
    try {
        let taskId = req.params.taskId;
        let status = req.params.status;
        // validating tasks id
        checkObjectId(taskId, "TaskId");
        // to check that the status is part of ENUM, validates status
        if (!Object.values(tasksData.TaskStatus).includes(status)) throw new Error('Status must be todo, doing, or done.');
        let task = { status: status };
        let updatedTask = await tasksData.update(taskId, task);
        res.status(200).json({ message: "Task has been updated successfully.", updatedTask: updatedTask })
    } catch (e) {
        console.log('error', e)
        res.status(500).json({ error: e.message });
    }
});

router.route('/delete/:taskId').delete(async (req, res) => {
    try {
        const taskId = req.params.taskId; // fetch task ID from the url params
        console.log("taskId", taskId)
        checkObjectId(taskId, "taskId");
        //TODO: throw 403 for mismatch ownerId, need to catch
        await tasksData.remove(taskId);
        res.status(200).json({ message: "Task Deleted Successfully" });
    } catch (e) {
        let status = e[0] ? e[0] : 500;
        let message = e[1] ? e[1] : 'Internal Server Error';
        res.status(status).json({ error: message });
    }
});

export default router;

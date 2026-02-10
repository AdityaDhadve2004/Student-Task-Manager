import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js"

const createTask = asyncHandler(
    async (req, res) => {
        const { title, description, dueDate, priority } = req.body;

        if (
            !title?.trim() ||
            !description?.trim() ||
            !priority?.trim() ||
            !dueDate
        ) {
            throw new ApiError(400, "All fields are required");
        }


        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            status: "pending",
            owner: req.user._id

        })

        const taskCreated = await Task.findById(task._id)

        if (!taskCreated) {
            throw new ApiError(500, "Something went wrong while creating a task")
        }

        res.status(201)
            .json(
                new ApiResponse(201, taskCreated, "Task created successfully")
            )

    }
)

const getAllTasks = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search = "", sortBy = "createdAt", order = "desc" } = req.query;

    const skip = (page - 1) * limit;

    const tasks = await Task.aggregate([
        {
            $match: {
                owner : new mongoose.Types.ObjectId(req.user._id)

            }
        },

        {
            $match: {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ]
            }
        },


        {
            $sort: {
                [sortBy]: order === "asc" ? 1 : -1
            }
        },

        {
            $skip: Number(skip)
        },
        {
            $limit: Number(limit)
        }
    ]);

    const totalTasks = await Task.countDocuments({
        owner: req.user._id,
        $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ]
    });

    res.status(200).json(
        new ApiResponse(200, {
            tasks,
            totalTasks,
            currentPage: Number(page),
            totalPages: Math.ceil(totalTasks / limit)
        }, "Tasks fetched successfully")
    );
});


const getTask = asyncHandler(
    async (req, res) => {
        const { taskId } = req.params;

        const id = isValidObjectId(taskId);

        if (!id) {
            throw new ApiError(400, "Invalid TaskId")

        }

        const task = await Task.findById(taskId)

        if (!task) {
            throw new ApiError(404, "No task was found")

        }

        const taskOwner = task.owner

        if (taskOwner.toString() !== req.user._id.toString()
        ) {
            throw new ApiError(403, "Not authorized to access this task")

        }

        res.status(200)
            .json(new ApiResponse(200, task, "Task fetched successfully"))

    }
)

const updateTask = asyncHandler(
    async (req, res) => {
        const { title, description, dueDate, priority } = req.body;

        const { taskId } = req.params;

        const id = isValidObjectId(taskId);

        if (!id) {
            throw new ApiError(400, "Invalid TaskId")

        }

        const task = await Task.findById(taskId)

        if (!task) {
            throw new ApiError(404, "No task was found")

        }

        const taskOwner = task.owner

        if (taskOwner.toString() !== req.user._id.toString()
        ) {
            throw new ApiError(403, "Not authorized to update this task")

        }


        const updatedTask = await Task.findByIdAndUpdate(taskId, {
            $set: {
                title,
                description,
                dueDate,
                priority

            }
        }, {
            new: true,
        })

        res.status(200)
            .json(new ApiResponse(200, updatedTask, "Task updated successfully"))

    }
)

const deleteTask = asyncHandler(
    async (req, res) => {
        const { taskId } = req.params;

        const id = isValidObjectId(taskId);

        if (!id) {
            throw new ApiError(400, "Invalid TaskId")

        }

        const task = await Task.findById(taskId)

        if (!task) {
            throw new ApiError(404, "No task was found")

        }

        const taskOwner = task.owner

        if (taskOwner.toString() !== req.user._id.toString()
        ) {
            throw new ApiError(403, "Not authorized to delete this task")

        }

        await Task.findByIdAndDelete(taskId)

        res.status(200).json(
            new ApiResponse(200, {}, "Task deleted successfully")
        );



    }
)

export { createTask, getTask, updateTask, deleteTask,getAllTasks }


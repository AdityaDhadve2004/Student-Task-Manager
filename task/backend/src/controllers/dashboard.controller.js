import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js"

const totalTaskCount = asyncHandler(
    async (req, res) => {
        const totalPendingTasks = await Task.countDocuments({
            owner: req.user._id,
            status: "pending"
        });

        const totalCompletedTasks = await Task.countDocuments({
            owner: req.user._id,
            status: "completed"
        });

        const totalTasks = await Task.countDocuments({
            owner: req.user._id,
        });

        

        res.status(200)
            .json(new ApiResponse(200, {

                pending: totalPendingTasks,
                completed: totalCompletedTasks,
                totalTasks : totalTasks,
            }, "Task count sent successfully"))

    }
)

export { totalTaskCount } 
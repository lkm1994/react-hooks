export const UPDATE_TASK_LIST = "UPDATE_TASK_LIST";

export const updateTaskList = (data) => {
    return {
        type: UPDATE_TASK_LIST,
        data
    }
}
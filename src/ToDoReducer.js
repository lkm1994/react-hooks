import * as toDoActions from './actions';

const initialState = {
    taskList: []
}
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case toDoActions.UPDATE_TASK_LIST:
            return state =  {
                ...state,
                taskList: action.data
            }
        default:
            return state;
    }
}

export default todoReducer;
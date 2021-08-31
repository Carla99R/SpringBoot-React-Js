import {ADD_STUDENT, ALL_STUDENTS, DELETE_STUDENT, ID_STUDENT} from '../types'

export default (state, action) => {
    const {payload, type, error} = action;

    switch (type) {
        case ALL_STUDENTS:
        case DELETE_STUDENT:
        case ADD_STUDENT:
            return {
                ...state,
                students: payload,
                error: error
            }
        case ID_STUDENT:
            return {
                ...state,
                selectedStudent: payload,
                error: error
            }
        default:
            return state;
    }
}
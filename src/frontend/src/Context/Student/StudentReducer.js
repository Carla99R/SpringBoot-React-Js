import {ALL_STUDENTS, ID_STUDENT} from '../types'

export default (state, action) => {
    const {payload, type} = action;

    switch (type) {
        case ALL_STUDENTS:
            return {
                ...state,
                students: payload
            }
        case ID_STUDENT:
            return {
                ...state,
                selectedStudent: payload
            }
        default:
            return state;
    }
}
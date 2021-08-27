import React, {useReducer} from 'react';
import StudentReducer from './StudentReducer';
import {getStudent, getStudents} from "../../global/petitions";
import StudentContext from "./StudentContext";

const StudentState = (props) => {

    const initialState = {
        students: [],
        selectedStudent: null
    }

    const [state, dispatch] = useReducer(StudentReducer, initialState)

    const allStudents = async () => {
        const res = await getStudents()
        dispatch({
            type: 'ALL_STUDENTS',
            payload: res
        })
    }

    const IdStudent = async (studentId) => {
        const res = await getStudent(studentId)
        dispatch({
            type: 'ID_STUDENT',
            payload: res.json()
        })
    }

    return (
        <StudentContext.Provider value={{
            students: state.students,
            selectedStudent: state.selectedStudent,
            allStudents,
            IdStudent
        }}>
            {props.children}
        </StudentContext.Provider>
    )
}
export default StudentState;






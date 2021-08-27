import {Popconfirm, message} from 'antd';
import {deleteStudent} from "../global/petitions";

const PopConfirm = (props) => {

    const confirm = async (e) => {
        await deleteStudent(props.student.id)
        props.fetchStudents()
        return message.success(`${props.student.name} deleted`);
    }

    return (
        <Popconfirm
            title={`Are you sure to delete ${props.student.name}?`}
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
        >
            <a href="#">Delete</a>
        </Popconfirm>
    );
}
export default PopConfirm;

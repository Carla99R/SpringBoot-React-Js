import {Popconfirm} from 'antd';
import {errorNotification, successNotification} from "./notification";

const PopConfirm = (props) => {

    const confirm = async (e) => {
        try {
            await props.deleteStudent(props.student.id)
            successNotification(
                `${props.student.name} successfully deleted`,
                `${props.student.name} was deleted from the system`)
        } catch (ex) {
            errorNotification(
                `Status ${ex.response.status}`,
                `${ex.response.statusText}`)
        }
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

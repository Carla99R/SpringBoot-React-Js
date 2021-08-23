import {Table} from 'antd';
import {useEffect} from "react";

const ClientsTable = (props) => {

    useEffect(() => {
        console.log(props.values)
    }, [])

    return (
        <>
            <Table columns={props.cols} dataSource={props.values} pagination={{pageSize: 10}} scroll={{y: 240}}/>
        </>
    )

}
export default ClientsTable;


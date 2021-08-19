import {Table} from 'antd';
import {useEffect, useState} from "react";

const ClientsTable = (props) => {

    const [columns, setColumns] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {
        setColumns(props.columns);
        setData(props.data);

    }, [])

    return (
       "HOLA"
        // <Table columns={columns} dataSource={data}/>
    )

}
export default ClientsTable;


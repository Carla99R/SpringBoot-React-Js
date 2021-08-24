import {Button, Divider, Table} from 'antd';
import styles from '../styles/client.module.css';
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import NewClient from "./drawer";

const ClientsTable = (props) => {
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <>
            <Button className={styles.boton} onClick={() => setShowDrawer(!showDrawer)} icon={<PlusOutlined/>}>Add
                student</Button>
            <NewClient
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
            />
            <Divider/>
            <Table columns={props.cols} dataSource={props.values} scroll={{y: 350}}/>
        </>
    )

}
export default ClientsTable;


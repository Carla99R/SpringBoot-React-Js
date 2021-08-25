import {Badge, Button, Divider, Table, Tag, Tooltip} from 'antd';
import styles from '../styles/client.module.css';
import {PlusOutlined, TeamOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import NewClient from "./drawer";
import Avatar from "antd/es/avatar/avatar";

const ClientsTable = (props) => {
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <>
            <div className={styles.header}>
                <Button className={styles.boton} onClick={() => setShowDrawer(!showDrawer)} icon={<PlusOutlined/>}>Add
                    student</Button>
                <div>
                    <Tooltip placement="top" title={"Number of students"}>
                        <Avatar
                            size={{
                                xs: 24,
                                sm: 32,
                                md: 40,
                                lg: 30,
                                xl: 44,
                                xxl: 50,
                            }} icon={<TeamOutlined/>}/>
                        <Badge count={props.students} className="site-badge-count-4"/>
                    </Tooltip>

                </div>
            </div>
            <NewClient
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={props.fetchStudents}
            />
            <Divider/>
            <Table columns={props.cols} dataSource={props.values} scroll={{y: 350}}/>
        </>
    )

}
export default ClientsTable;


import {Badge, Button, Divider, Table, Tag, Tooltip} from 'antd';
import styles from '../styles/client.module.css';
import {PlusOutlined, TeamOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import NewClient from "./drawer";
import Avatar from "antd/es/avatar/avatar";
import useWindowDimensions from "./windowsDimensions";

const ClientsTable = (props) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const {height, width} = useWindowDimensions();


    return (
        <>
            <div className={styles.header}>
                <Button className={styles.boton} onClick={() => setShowDrawer(!showDrawer)} icon={<PlusOutlined/>}><h1
                    className={styles.hide}>Add student</h1></Button>
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
            <div className={styles.tabla}>
                <Table columns={props.cols} dataSource={props.values}
                       scroll={{y: 350}}/>
            </div>

        </>
    )

}
export default ClientsTable;


import React, {useState, useEffect, useContext} from 'react'
import {Layout, Menu, Breadcrumb, Spin, Empty} from 'antd';
import styles from '../styles/client.module.css';
import ClientsTable from '../components/clientsTable';
import PopConfirm from "../components/popconfirm";
import StudentContext from "../Context/Student/StudentContext";
import SiderMenu from "../components/sider";
import {errorNotification, successNotification} from "../components/notification";

const Client = () => {

    const {Header, Content} = Layout;

    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([{}]);

    const {students, allStudents, addStudents, deleteStudents, error} = useContext(StudentContext);
    let c = []

    const cols = []
    const values = []

    const fetchStudents = async () => {
        await allStudents()
    }

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents()

    }, [])

    useEffect(() => {
        setLoading(false)
        if (error !== null) {
            errorNotification(
                `Status ${error.status}`,
                `${error.statusText}`)
        }

        table(students)

    }, [students])

    const validateCols = (col) => {
        let repeated = false;

        for (let i = 0; i < cols.length; i++) {
            if (cols[i] === col) {
                repeated = true;
            }
        }

        return repeated;
    }

    const table = () => {

        for (let k in students) {
            const value = {}
            value.action = <PopConfirm student={students[k]} deleteStudent={deleteStudents}/>
            for (let k2 in students[k]) {
                if (!validateCols(k2)) {
                    const params = {}
                    params.field = k2
                    params.headerName = k2
                    params.width = 150
                    cols.push(k2)
                    c.push(params)

                }
                value[k2] = students[k][k2]

            }
            values.push(value)
        }
        const value = {}

        values.push(value)

        const params = {}
        params.field = "action"
        params.headerName = "action"
        params.width = 150
        cols.push("action")
        c.push(params)

        setColumns(c)
        setData(values)
    }


    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <SiderMenu/>
                <Header className={styles.bg} style={{padding: 0}}/>
                <Content style={{margin: '16px 20px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.bg} style={{padding: 24, minHeight: 600}}>
                        {loading ?
                            <div className={styles.spin}>
                                <Spin tip="Loading..." size="large"/>
                            </div>
                            :
                            error !== null ?
                                <div className={styles.tabla} id={styles.empty}>
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                                </div>
                                :
                                <ClientsTable cols={columns} values={data}
                                              students={students.length} add={addStudents}/>

                        }
                    </div>
                </Content>
            </Layout>

        </>

    )
}


export default Client;

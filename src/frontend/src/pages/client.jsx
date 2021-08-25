import fetch from 'unfetch';
import React, {useState, useEffect} from 'react'
import {Layout, Menu, Breadcrumb, Spin, Empty} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import styles from '../styles/client.module.css';
import ClientsTable from '../components/clientsTable';
import Logo from '../assets/images/logo.svg'
import LogoComprimido from '../assets/images/switch.svg'

const Client = () => {

    const {Header, Content, Footer, Sider} = Layout;
    const {SubMenu} = Menu;
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false)

    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState([{}]);

    let c = []

    const cols = []
    const values = []

    useEffect(async () => {
        console.log("component is mounted");
        await fetchStudents();
    }, [])


    const checkStatus = response => {
        if (response.ok) {
            setLoading(false)
            return response;
        }
        // convert non-2xx HTTP responses into errors:
        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
    }

    const getAllStudents = async () =>
        await fetch("api/v1/students")
            .then(checkStatus);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setLoading(false)
                table(data)
            })

    const validateCols = (col) => {
        let repeated = false;

        for (let i = 0; i < cols.length; i++) {
            if (cols[i] === col) {
                repeated = true;
            }
        }

        return repeated;
    }

    const table = (data) => {

        for (let k in data) {
            const value = {}

            for (let k2 in data[k]) {
                if (!validateCols(k2)) {
                    const params = {}
                    params.title = k2
                    params.dataIndex = k2
                    params.key = k2
                    cols.push(k2)
                    c.push(params)
                }
                value[k2] = data[k][k2]
            }
            values.push(value)
        }
        setColumns(c)
        setData(values)
    }


    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed}
                       onCollapse={setCollapsed}>
                    <div className={styles.logo}>
                        {collapsed ? <img src={LogoComprimido} alt={"logo"} width={40} height={50}/> :
                            <img src={Logo} alt={"logo"} width={100} height={50}/>}
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                            Option 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined/>}>
                            Option 2
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined/>}>
                            Files
                        </Menu.Item>
                    </Menu>
                </Sider>
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
                            <ClientsTable cols={columns} values={data}/>
                        }
                    </div>
                </Content>
                {/*<Footer style={{textAlign: 'center'}}>By Carla Rodríguez (2021)</Footer>*/}
            </Layout>

        </>

    )
}


export default Client;

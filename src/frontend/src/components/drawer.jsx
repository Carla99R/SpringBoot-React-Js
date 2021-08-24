import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Divider} from 'antd';
import styles from '../styles/client.module.css';
import {useState} from "react";
import {useForm} from "react-hook-form";


const NewClient = (props) => {

    const {Option} = Select;
    const {handleSubmit} = useForm({
        reValidateMode: 'onSubmit'
    });

    const onClose = () => {
        props.setShowDrawer(false)
    };

    const onFinish = values => {
        alert(JSON.stringify(values, null, 2));
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    const [data, setData] = useState({
        name: "",
        email: "",
        gender: ""
    })

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.target.reset();
    }

    return (
        <>
            <Drawer
                title={
                    <div style={{display: "flex", padding: "10px 0 10px 0"}}>
                        <p className={styles.title}>Create new student</p>
                    </div>
                }
                width={720}
                onClose={onClose}
                visible={props.showDrawer}
                bodyStyle={{paddingBottom: 60}}
            >
                <div className={styles.client}>
                    <img
                        src={"https://image.freepik.com/free-vector/software-ins…ted-concept-metaphor-illustration_335657-2721.jpg"}
                        alt={"New Student"}/>
                </div>
                <Form layout="vertical"
                      onFinishFailed={onFinishFailed}
                      onFinish={onFinish}
                      hideRequiredMark
                      onSubmit={(e) => onSubmit(e)}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter student name'}]}
                            >
                                <Input placeholder="Please enter student name" onChange={handleChange} name="name"
                                       defaultValue={""}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{required: true, message: 'Please enter student email'}]}
                                onChange={handleChange}
                            >
                                <Input placeholder="Please enter student email" onChange={handleChange} name="email"
                                       defaultValue={""}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="gender"
                                rules={[{required: true, message: 'Please select a gender'}]}
                                onChange={handleChange}
                            >
                                <Select placeholder="Please select a gender">
                                    <Option value="MALE">MALE</Option>
                                    <Option value="FEMALE">FEMALE</Option>
                                    <Option value="OTHER">OTHER</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider/>
                    <div
                        className={styles.botones}
                    >
                        <Button onClick={onClose} className={styles.botonS}>
                            Cancel
                        </Button>
                        <Button className={styles.boton} htmlType="submit" type="submit" onClick={onClose}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </>
    )

}
export default NewClient;


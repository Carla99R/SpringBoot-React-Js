import {Drawer, Form, Button, Col, Row, Input, Select, Divider} from 'antd';
import styles from '../styles/client.module.css';
import React, {Component, useState} from "react";
import fetch from "unfetch";
import {successNotification, errorNotification} from "./notification";
import useWindowDimensions from "./windowsDimensions";

const {Option} = Select;


const NewClient = (props) => {
    const [state, setState] = useState({
        name: "",
        email: "",
        gender: "",
        loading: false
    })
    const [form] = Form.useForm();

    const onClose = () => {
        props.setShowDrawer(false)
        form.resetFields()
    };


    const addNewStudent = (student) => {
        setState({loading: true})
        fetch("api/v1/students", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(student)
        }).then(() => {
            console.log("student added")
            setState({loading: false})
            onClose()
            props.fetchStudents()
            successNotification(
                "Student successfully added",
                `${student.name} was added to the system`)
        }).catch(err => {
            console.log(err)
            setState({loading: false})
            errorNotification(
                "Student could not be added",
                `${student.name} could not be added to the system`)
        })
    }

    const onFinish = (student) => {
        console.log(JSON.stringify(student, null, 2));
        addNewStudent(student)
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    const handleChange = e => {
        setState({
            [e.target.name]: e.target.value
        })
    }

    const {height, width} = useWindowDimensions();

    return (
        <>
            <Drawer
                title={
                    <div style={{display: "flex", padding: "0 0 10px 0"}}>
                        <p className={styles.title}>Create new student</p>
                    </div>
                }
                width={width <= 700 ? width : 500}
                onClose={onClose}
                visible={props.showDrawer}
                bodyStyle={{paddingBottom: 90, overflow: 'hidden'}}
            >
                <div className={styles.client}>
                    <img
                        src={"https://image.freepik.com/free-vector/resume-writi…r-candidate-profile-career-summary_335657-143.jpg"}
                        alt={"New Student"}/>
                </div>
                <Form layout="vertical"
                      onFinishFailed={onFinishFailed}
                      onFinish={onFinish}
                      form={form}
                      hideRequiredMark
                      initialValues={{}}
                >
                    < Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter student name'}]}
                            >
                                <Input placeholder="Please enter student name" onChange={handleChange}
                                       name="name"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{required: true, message: 'Please enter student email'}]}
                                onChange={handleChange}
                            >
                                <Input placeholder="Please enter student email" onChange={handleChange}
                                       name="email"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
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
                    <Form.Item
                        className={styles.botones}
                    >
                        <Button className={styles.boton} id={styles.submit} htmlType="submit"
                                loading={state.loading}>
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Drawer>


        </>
    )
}

export default NewClient;


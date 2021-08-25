import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Divider, Spin} from 'antd';
import styles from '../styles/client.module.css';
import React, {Component} from "react";
import fetch from "unfetch";

const {Option} = Select;

class NewClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            gender: "",
            loading: false
        }
    }

    onClose = () => {
        this.props.setShowDrawer(false)
    };

    addNewStudent = (student) => {
        this.setState({loading: true})
        fetch("api/v1/students", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(student)
        }).then(() => {
            console.log("student added")
            this.setState({loading: false})
            this.onClose()
            window.location.reload(true)
        }).catch(err => {
            console.log(err)
            this.setState({loading: false})
        })
    }

    onFinish = (student) => {
        console.log(JSON.stringify(student, null, 2));
        this.addNewStudent(student)
    };

    onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <>
                <Drawer
                    title={
                        <div style={{display: "flex", padding: "0 0 10px 0"}}>
                            <p className={styles.title}>Create new student</p>
                        </div>
                    }
                    width={500}
                    onClose={this.onClose}
                    visible={this.props.showDrawer}
                    bodyStyle={{paddingBottom: 60}}
                >
                    <div className={styles.client}>
                        <img
                            src={"https://image.freepik.com/free-vector/resume-writi…r-candidate-profile-career-summary_335657-143.jpg"}
                            alt={"New Student"}/>
                    </div>
                    <Form layout="vertical"
                          onFinishFailed={this.onFinishFailed}
                          onFinish={this.onFinish}
                          hideRequiredMark
                          initialValues={{}}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{required: true, message: 'Please enter student name'}]}
                                >
                                    <Input placeholder="Please enter student name" onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                >
                                    <Input placeholder="Please enter student email" onChange={this.handleChange}
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
                                    onChange={this.handleChange}
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
                                    loading={this.state.loading}>
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Drawer>


            </>
        )
    }


}

export default NewClient;


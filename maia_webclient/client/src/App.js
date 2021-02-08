import React,{ Component } from "react";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Input, Space,Button,Row, Col  } from 'antd';
import { Form, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './login.css';
const { Header, Footer,Content } = Layout;

const NormalLoginForm  = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

const InformationBlock = () =>{
  return (<div style={{textAlign: 'center'}}>
    <h1>One Account. All Clients</h1>
    <p>sign in to continue using maia</p>
    </div>);
}
const App = () => {
  return (
    
      <Row>
      <Col span={24}>
        <Layout className="layout">
          <Header>
          <div className="logo" />
          </Header>
        <Content style={{ padding: '50px 450px' }}>
          <InformationBlock />
        <div className="site-layout-content">
          <NormalLoginForm/>
        </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>maia ©2021 Created by SVSN, The company</Footer>
        </Layout>
      </Col>
    </Row>
    
  );
};


export default App;
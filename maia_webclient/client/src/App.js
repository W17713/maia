import React,{ Component } from "react";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Input, Space,Button,Row, Col  } from 'antd';
import { Form, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './login.css';
import {BrowserRouter as Router, Switch,Link,Route} from 'react-router-dom'
import Highlightview from './components/component.highlight'
import NormalSignupForm from "./components/component.signup";
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
        Or <Link to="/signup" >register now!</Link>
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
  if(true){
    return (
      <Router>
        <div>
          <Row>
            <Col span={24}>
              <Layout className="layout">
                <Highlightview/>
                  <Switch>
                    <Route path="">
                    </Route>
                    <Route path=""> 
                    </Route>
                  </Switch>             
              </Layout>
            </Col>
          </Row>
        </div>
      </Router>

    );
  }else{
  return (
    <Router>
      <div>
        <Row>
          <Col span={24}>
            <Layout className="layout">
              <Header>
              <div className="logo" />
              </Header>
            <Content style={{ padding: '50px 450px' }}>
              
              <div className="site-layout-content">
                <Switch>
                  <Route exact path="/">
                    <InformationBlock />
                    <NormalLoginForm/>
                  </Route>
                  <Route path="/signup">
                      <NormalSignupForm/>
                  </Route>
                </Switch>
              </div>
            
            </Content>
            <Footer style={{ textAlign: 'center' }}>maia ©2021 Created by SVSN, The company</Footer>
            </Layout>
          </Col>
        </Row>
      </div>
    </Router>
  );
}
};


export default App;
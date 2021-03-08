import React,{ Component, useState } from "react";
import { Input, Space,Button,Row, Col, message  } from 'antd';
import { Form, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../login.css';
import {BrowserRouter as Router, Switch,Link,Route} from 'react-router-dom'

const DisplayInfo = (props)=> {
    //if(props.message!='success'){
        return <div style={{color:'red'}}>{props.message}</div>
    //}
}



const NormalLoginForm  = (props) => {
    
    const [msg,setMsg] = useState('');
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
      console.log('btoa'+btoa(values.password));
    const enc_user = btoa(values.username);
    const enc_pass =btoa(values.password);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username: enc_user,
        password: enc_pass
      })
    }
    fetch('/login',requestOptions)
    .then(async response => {
      const responseData = await response.json();
      console.log('response data below');
      console.log(responseData);
      if(responseData.resp=='success'){
        props.appcallback(responseData);
      }
      setMsg(responseData.resp);
    });
    };
    
    const errorMessage = (msg!='success') ? <DisplayInfo message={msg}/> : null;
    
    return (
      
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
          {errorMessage}
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
          <Button type="primary" htmlType="submit" className="login-form-button" >
            Log in
          </Button>
          Or <Link to="/signup" >register now!</Link>
        </Form.Item>
      </Form>
    );
  };
  
  

  export default NormalLoginForm;
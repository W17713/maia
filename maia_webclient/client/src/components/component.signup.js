import React, { Component, useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {BrowserRouter as Router, Switch,Route,useHistory} from 'react-router-dom'
import NormalLoginForm from './component.login';



const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const DisplayInfo =(props) => {
    if(props.message!='success'){
        return <div style={{color:'red'}}>{props.message}</div>
    }
}

const NormalSignupForm = ()=>{
    const [message,setMsg] = useState('');
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    //if agree, send entered data for confirmation
        const encusername = btoa(values.username);
        const encemail = btoa(values.email);
        const encpassword = btoa(values.password);
        const encconfirmpass = btoa(values.confirmpass);
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(
            {
                username: encusername,
                email: encemail,
                password: encpassword,
                confirmpass: encconfirmpass
            }
        )
    }
    if(values.agreement===true){
        fetch('/signup',requestOptions).then(
            async response => {
                const dat = await response.json();
                console.log('data '+dat.resp);
                if(dat.resp=='success'){
                  //history.push('/login')
                  window.location.href='/'
                }else{
                  setMsg(dat.resp);
                }
            }
        );
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
        <DisplayInfo message={message}/>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirmpass"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="username"
        label={
          <span>
            Username&nbsp;
            <Tooltip title="Choose a username to be identified by">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    )
};

export default NormalSignupForm;
 /*<Form.Item label="Captcha" extra="We must make sure that your are human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: 'Please input the captcha you got!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>*/


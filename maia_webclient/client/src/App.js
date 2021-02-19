import React,{ Component } from "react";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import {Row, Col  } from 'antd';
/*import { Form, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';*/

import {BrowserRouter as Router, Switch,Link,Route,Redirect} from 'react-router-dom'
import Homeview from './components/component.home'
import NormalSignupForm from './components/component.signup';
import NormalLoginForm from './components/component.login';
import session from "express-session";
const { Header, Footer,Content } = Layout;


const Head = ()=>{
  return (
    <Header>
      <div className="logo" />
    </Header>
  );
}

const Foot = ()=>{
  return (
    <Footer style={{ textAlign: 'center' }}>maia ©2021 Created by SVSN, The company</Footer>
  );
}


const InformationBlock = () =>{
  return (<div style={{textAlign: 'center'}}>
    <h1>One Account. All Clients</h1>
    <p>sign in to continue using maia</p>
    </div>);
}




class App extends Component 
{
  constructor(props){
    super(props);
    this.state = {
      hasToken: false,
    }
    this.recieveloginstate = this.recieveloginstate.bind(this);
    this.getToken = this.getToken.bind(this);
  }

    recieveloginstate(data){
      sessionStorage.setItem('token',JSON.stringify(data));
      this.setState({hasToken:true});
    }
    getToken(){
      const token = sessionStorage.getItem('token');
      const tokenpair = JSON.parse(token);
      return tokenpair;
    }


    render(){
      const token = this.getToken();
      if(token){
        return (
          <Router>
            <div>
              <Row>
                <Col span={24}>
                  <Layout className="layout">
                    <Head/>
                      <Homeview/> 
                      <Foot/>           
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
                <Head/>
                <Content style={{ padding: '50px 450px' }}>
                  <div className="site-layout-content">
                    <Switch>
                      <Route exact path="/">
                        <InformationBlock />
                        <NormalLoginForm appcallback={this.recieveloginstate}/>
                      </Route>
                      <Route path="/signup">
                          <NormalSignupForm/>
                      </Route>
                    </Switch>
                  </div>
                </Content>
                <Foot/>
                </Layout>
              </Col>
            </Row>
          </div>
        </Router>
      );
    }
    }
}


export default App;
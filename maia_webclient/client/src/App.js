import React,{ Component } from "react";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import {Row, Col  } from 'antd';
/*import { Form, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';*/

import {BrowserRouter as Router, Switch,Link,Route} from 'react-router-dom'
import Highlightview from './components/component.highlight'
import NormalSignupForm from './components/component.signup';
import NormalLoginForm from './components/component.login';
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
    render(){
      if(false){
        return (
          <Router>
            <div>
              <Row>
                <Col span={24}>
                  <Layout className="layout">
                    <Head/>
                      <Highlightview/>
                        <Switch>
                          <Route path="">
                          </Route>
                          <Route path=""> 
                          </Route>
                        </Switch>  
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
                        <NormalLoginForm/>
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
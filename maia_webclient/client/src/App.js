import React,{ Component } from "react";
import { Layout,Menu, Dropdown,Modal,Button } from 'antd';
import 'antd/dist/antd.css';
import {Row, Col  } from 'antd';
/*import { Form, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';*/
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import {BrowserRouter as Router, Switch,Link,Route,Redirect} from 'react-router-dom'
import Homeview from './components/component.home'
import Highlightsview from './components/component.highlight'
import NormalSignupForm from './components/component.signup'
import NormalLoginForm from './components/component.login'
import Publicview from './components/component.public'
import session from "express-session";
import Error403 from './components/component.403'
import Error404 from './components/component.404'
import Sider from './components/component.settings'
const { Header, Footer,Content } = Layout;

const { confirm } = Modal;

const showConfirm = () => {
  const requestOptions={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  confirm({
    title: 'Do you want to logout of maia?',
    icon: <ExclamationCircleOutlined />,
    content: 'You can always log back in at any time',
    onOk() {
      console.log('OK');
      fetch('/logout',requestOptions).then(async response =>{
        const resp = await response.json();
        if(resp.resp =='destroyed'){
          console.log('loggin out');
          sessionStorage.clear();
          postMessage({sender:'logout',source:'maia'},'*');
          window.location.href='/'
        }
      });
      
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

const Head = (props)=>{
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/settings"><SettingOutlined />Settings</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a onClick={showConfirm}><LogoutOutlined />Logout</a>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );
  const username = JSON.parse(sessionStorage.getItem('user'));
  return (
    <Header>
      <div className="logo" />
      {(props.loggedin==true)? <>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color:'white',fontSize:18}}>
            <UserOutlined style={{color:'white'}} /> { username } <DownOutlined style={{color:'white'}} />
          </a>
        </Dropdown>
         </>: null}
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
      username:'',
      userid: ''
    }
    this.recieveloginstate = this.recieveloginstate.bind(this);
    this.getToken = this.getToken.bind(this);
  }

    recieveloginstate(data){
      sessionStorage.setItem('token',JSON.stringify(data.token));
      localStorage.setItem('token',JSON.stringify(data.token));
      sessionStorage.setItem('user',JSON.stringify(data.username));
      sessionStorage.setItem('userid',JSON.stringify(data.userid));
      //window.postMessage({sender:'mydash',source:'maia',message:{identifier:data.userid,name:data.username}},'*');
      console.log('message posted');
      this.setState({hasToken:true});
      console.log('user '+data.username);
      console.log('userid '+data.userid);
    }
    getToken(){
      const token = sessionStorage.getItem('token');
      const id = sessionStorage.getItem('userid');
      const username = sessionStorage.getItem('username');
      const tokengroup = {token:JSON.parse(token),id:JSON.parse(id),username:JSON.parse(username)};
      return tokengroup;
    }
    componentDidMount(){
      this.getToken();
    }

    render(){
      const tokengrp = this.getToken();
      if(tokengrp.token){
        return (
          <Router>
            <div>
              <Row>
                <Col span={24}>
                  <Layout className="layout">
                    <Switch>
                      <Redirect exact from='/' to='/home'/>          
                      <Route exact path="/home">
                        <Head loggedin={true} loggeduser={tokengrp.username}/>
                        <Homeview loggeduser={tokengrp.userid}/> 
                        <Foot/>
                      </Route> 
                      <Route  path="/signup">
                        <Redirect to='/'/>
                      </Route>
                      <Route  path="/login">
                        <Redirect to='/'/>
                      </Route>
                      <Route  path="/highlights">
                        <Redirect to='/home'/>
                      </Route>
                      <Route  path="/settings">
                        <Sider />
                      </Route>
                      <Route  path="/public">
                        <Publicview />
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
                <Head/>
                <Content style={{ padding: '50px 450px' }}>
                  <div className="site-layout-content">
                    <Switch>
                      <Route  exact path="/">
                        <InformationBlock />
                        <NormalLoginForm appcallback={this.recieveloginstate}/>
                      </Route>
                      <Route  path="/signup">
                          <NormalSignupForm/>
                      </Route>
                      <Route  path="/login">
                        <Redirect to='/'/>
                      </Route>
                      <Route  path="/home">
                        <Redirect to='/'/>
                      </Route>
                      <Route  path="/highlights">
                        <Redirect to='/'/>
                      </Route>
                      <Route  path="/public">
                        <Publicview />
                      </Route>
                      <Route path='/admin'>
                        <Error403/>
                      </Route>
                      <Route  path="/*">
                        <Error404 />
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
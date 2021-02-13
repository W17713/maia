import {Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Form} from 'antd';
import '../highlightview.css';
import LoadMoreList from './component.list'
import File from './component.file'
import Share from './component.share'
import {BrowserRouter as Router,Switch,Route,Link,withRouter} from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
/*
function Textitem(props){
    return <li>{props.value}</li>;
}

function Textlist(props){
    const Text = props.text;
    const ListItem = Text.map((textitem)=> 
    <Textitem key={textitem.toString()} value={textitem}/>
    );
    return <ul>{ListItem}</ul>;
}
<Textlist text={this.state.highlight}/>*/
class Highlightview extends Component {
   
    state = {
      collapsed: false,
      highlight:[]
    }
    
    componentDidMount(){
        fetch('/highlights').then(
            res => res.json()
        ).then(
            res => this.setState({highlight:res})
        ).catch(err => err);
    }


    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    }
    
    nextpath(path){
      this.props.history.push(path);
    }
    render() {
      const { collapsed } = this.state;
      //const { collapsed } = '';
      return (
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                  Option 2
                </Menu.Item>
                
                  <SubMenu key="sub1" icon={<UserOutlined />} title="Topics">
                  <Menu.Item key="3"><Link to="/">Highlights</Link></Menu.Item>
                  <Menu.Item key="4"><Link to="/">Links</Link></Menu.Item>
                  <Menu.Item key="5"><Link to="/">Pages</Link></Menu.Item>
                  </SubMenu>
                
                
                  <SubMenu key="sub2" icon={<TeamOutlined />} title="Shared">
                  
                  <Menu.Item key="6"><Link to="/share">Sent</Link></Menu.Item>
                  <Menu.Item key="8"><Link to="/share">Received</Link></Menu.Item>
                  </SubMenu>
                
                
                  <Menu.Item key="9" icon={<FileOutlined />}> 
                  <Link to="/file">Files</Link>
                  </Menu.Item>
                
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Topic</Breadcrumb.Item>
                  <Breadcrumb.Item>Photo</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    
                    <Switch>
                      <Route exact path="/"><LoadMoreList/></Route>
                      <Route path="/share"><Share/></Route>
                      <Route path="/file"><File/></Route>
                    </Switch>
                  
                </div>
              </Content>
              
            </Layout>
          </Layout>
        </Router>
      );
    }
  }


export default withRouter(Highlightview) ;
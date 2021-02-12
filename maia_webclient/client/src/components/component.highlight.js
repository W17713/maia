import {Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../highlightview.css';
import LoadMoreList from './component.list'
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
  
    render() {
      const { collapsed } = this.state;
      //const { collapsed } = '';
      return (
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
                <Menu.Item key="3">Highlights</Menu.Item>
                <Menu.Item key="4">Links</Menu.Item>
                <Menu.Item key="5">Pages</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Shared">
                <Menu.Item key="6">Sent</Menu.Item>
                <Menu.Item key="8">Received</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                Files
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
                  <LoadMoreList/>
                
              </div>
            </Content>
            
          </Layout>
        </Layout>
      );
    }
  }


export default Highlightview;
import React,{useState} from 'react'
import { Tabs } from 'antd';


const { TabPane } = Tabs;

const ShareTab = (props) =>{
    var key = props.whichkey;
    console.log('key st'+key)
    function callback(key) {
    }
      return (
          //onTabClick={callback} 
        <Tabs type="card" activeKey={props.whichkey}>
            <TabPane tab="Sent" key="6">
            Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Received" key="7">
            Content of Tab Pane 2
            </TabPane>
        </Tabs>
    )
      
      }

const Share = (props)=>
{
    //console.log(props.whichone);
    //const [whichkey,setwhich]=useState('');
    
      //console.log('key '+props.whichone);
    if(props.whichone=="6")
    {
    return (
        <ShareTab whichkey="6"/>
    )
    }else
    {
    return (
        <ShareTab whichkey="7"/>
    )
    }
};
export default Share;
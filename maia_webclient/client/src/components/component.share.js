import React,{useEffect,useState} from 'react'
import { Tabs,List, Avatar  } from 'antd';


const { TabPane } = Tabs;
/*
const ShareTab = (props) =>{
    var key = props.whichkey;
    var tabdata= props.data;
    console.log('key st'+key);
    console.log('data '+props.data);
    /*function callback(key) {
        <ul>
                    {tabdata.map(i => <li key={i._id}>{i.sender}{i.topic}</li>)}
                </ul>
    }*//*
      return (
          //onTabClick={callback} 
        <Tabs type="card" activeKey={props.whichkey}>
            <TabPane tab="Sent" key="6">
            {props.data}
            </TabPane>
            <TabPane tab="Received" key="7">
                <ul>
                    {tabdata.map(i => <li key={i._id}>{i.sender}{i.topic}</li>)}
                </ul>
            </TabPane>
        </Tabs>
    )
      
      };*/


const getsharedItems = async (url) =>{
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        };
        const response = await fetch(url,requestOptions);
            return new Promise(function(resolve,reject){
                resolve(response);
            });
    };

const id = JSON.parse(sessionStorage.getItem('userid'));

console.log('userid shared '+id);
const Share = (props)=>
{
    const [sharedItems,setShared] = useState([]);
    //console.log(props.whichone);
    //const [whichkey,setwhich]=useState('');
    var url = '';
    var key='';
    console.log('key '+props.whichone);
    
    if(props.whichone=="6")
    {
        url = `http://localhost:3080/share/sent?id=${id}`;
        key ="6";
    }
    if(props.whichone=="7")
    {
        url = `http://localhost:3080/share/received?id=${id}`;//
        key = "7";
    }
    useEffect(
        () =>{
            let mounted = true;
            getsharedItems(url).then(async items => {
                console.log('item url '+url);
                const list = await items.json();
                if(mounted)
                //console.log('mounted');
                {setShared(list)}
                //console.log('list');
                console.log(list);
            }).catch(err=>{console.log(err.message)});
            return () => mounted = false;
        },[]
    )
    
  //  <ShareTab whichkey={key} data={sharedItems}/>
    return (
        <Tabs type="card" activeKey={key}>
            <TabPane tab="Sent" key="6">
            <List
                    itemLayout="horizontal"
                    dataSource={sharedItems}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.topic}</a>}
                        description={'sent to: '+item.receiver}
                        />
                    </List.Item>
                    )}
                />
            </TabPane>
            <TabPane tab="Received" key="7">
                
                <List
                    itemLayout="horizontal"
                    dataSource={sharedItems}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.topic}</a>}
                        description={'sent by: '+item.sender}
                        />
                    </List.Item>
                    )}
                />
            </TabPane>
        </Tabs>
    )

};
export default Share;
import React,{useState} from 'react'
import { Tabs } from 'antd';


const { TabPane } = Tabs;

const ShareTab = (props) =>{
    var key = props.whichkey;
    console.log('key st'+key)
    /*function callback(key) {
    }*/
      return (
          //onTabClick={callback} 
        <Tabs type="card" activeKey={props.whichkey}>
            <TabPane tab="Sent" key="6">
            {props.data}
            </TabPane>
            <TabPane tab="Received" key="7">
            {props.data}
            </TabPane>
        </Tabs>
    )
      
      };


      const getsharedItems = (url) =>{
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        };
            return new Promise(function(resolve,reject){
                resolve(fetch(url,requestOptions)).catch(err=>{this.handleError(err.message)});
            });
    };

const id = sessionStorage.getItem('userid');
const Share = (props)=>
{
    const [sharedItems,setShared] = useState('');
    //console.log(props.whichone);
    //const [whichkey,setwhich]=useState('');
    
    console.log('key '+props.whichone);
    var url = '';
    var key='';
    if(props.whichone=="6")
    {
        console.log('props '+ props.whichone);
        url = `http://localhost:3000/share/sent?id=${id}`;
        key ="6";
    }else
    {
        url = `http://localhost:3000/share/received?id=${id}`;
        key = "7";
    }
    getsharedItems(url).then(async items => {
        console.log('item url '+url);
        const list = await items.json();
        
        console.log('list');
        console.log(list);
        setShared(list);
    });
    return (
        <ShareTab whichkey={key} data={sharedItems}/>
    )

};
export default Share;